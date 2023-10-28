import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getUserDocument } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

function Profile() {
    const { user } = useUser();
    const router = useRouter();
    const { id } = router.query;

    const signUpDate = user ? new Date(user.metadata.creationTime) : null;
    const month = signUpDate
        ? signUpDate.toLocaleString("default", { month: "long" })
        : null;
    const year = signUpDate ? signUpDate.getFullYear() : null;
    const formattedDate = signUpDate ? `${month} ${year}` : null;

    const [isOwner, setIsOwner] = useState(false);
    useEffect(() => {
        if (user && user.uid === id) {
            setIsOwner(true);
        }
    }, [id, user]);

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getUserDocument(id);
                if (userDoc.exists) {
                    setUserData(userDoc.data());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <Layout>
            {userData && (
                <div className='flex flex-col p-2 items-center align-middle'>
                    <div className='relative inline-block group '>
                        <div className='relative'>
                            {userData.avatar ? (
                                <img
                                    src={userData.avatar}
                                    alt='Avatar'
                                    className='rounded-full border-orange-400 border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 hover:p-4'
                                />
                            ) : (
                                <img
                                    src='/images/defaultUser.png'
                                    alt='Default Avatar'
                                    className='rounded-full border-orange-400 border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                />
                            )}

                            {/* Tooltip for the user's account creation date */}
                            <div className='hidden group-hover:block absolute left-[100%] top-[25%] bg-black text-white p-2 rounded-lg text-center w-36'>
                                {formattedDate
                                    ? `Joined on: ${formattedDate}`
                                    : "Join date not available"}
                            </div>
                        </div>
                    </div>
                    <h1 className='justify-center items-center font-bold my-3'>
                        {userData.displayName}
                    </h1>
                    {isOwner && (
                        <Link
                            href='/profile/editProfile'
                            className='border-transparent border-4 bg-orange-400 rounded-md p-2 m-2'
                        >
                            Edit Profile
                        </Link>
                    )}

                    <div className='flex p-2 flex-row justify-center items-center my-3'>
                        <div>Full Name:</div>{" "}
                        <div className='font-semibold mx-2'>
                            {userData.fullName}
                        </div>
                    </div>
                    <div className='flex w-screen p-2 justify-center my-3'>
                        <div>Location: </div>
                        <div className='font-semibold mx-2'>
                            {userData.location}
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        Interests:{" "}
                        {userData.userInterests &&
                        userData.userInterests.length > 0 ? (
                            <div className='flex flex-col md:flex-row items-center my-2'>
                                {userData.userInterests.map((interest) => (
                                    <div
                                        key={interest}
                                        className='flex flex-col md:flex-row items-center text-center justify-center border-transparent rounded-sm bg-orange-400 w-40 h-14 p-2 m-2'
                                    >
                                        {interest}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {isOwner ? (
                                    <div>
                                        You have not set any interest. Head to
                                        the{" "}
                                        <Link
                                            className='text-indigo-800 underline hover:font-semibold hover:rounded-lg hover:bg-orange-300'
                                            href='/profile/editProfile '
                                        >
                                            Edit Profile
                                        </Link>{" "}
                                        to add some.
                                    </div>
                                ) : (
                                    <div>No interests found.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Profile;
