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
    console.log(user);

    return (
        <Layout>
            {userData && (
                <div>
                    <h1>{userData.displayName}</h1>
                    <div className='relative inline-block group'>
                        <div className='relative'>
                            {userData.avatar ? (
                                <img
                                    src={userData.avatar}
                                    alt='Avatar'
                                    className='rounded-full border-orange-400 border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                />
                            ) : (
                                <img
                                    src='/images/defaultUser.png'
                                    alt='Default Avatar'
                                    className='rounded-full border-orange-400 border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                />
                            )}

                            {/* Tooltip for the user's account creation date */}
                            <div className='hidden group-hover:block absolute bg-black text-white p-2 rounded-lg text-center w-full'>
                                {formattedDate
                                    ? `Joined on: ${formattedDate}`
                                    : "Join date not available"}
                            </div>
                        </div>
                    </div>

                    <div>Full Name: {userData.fullName}</div>
                    <div>Location: {userData.location}</div>
                    <div>
                        Interests:{" "}
                        {userData.userInterests ? (
                            userData.userInterests.map((interest) => (
                                <div
                                    key={interest}
                                    className='flex flex-col items-center basis-1/2 sm:basis-1/4 md:basis-1/6 mr-4 mb-4 p-4 border-2 border-gray-300 cursor-pointer hover:font-semibold hover:border-4'
                                >
                                    {interest}
                                </div>
                            ))
                        ) : (
                            <div>No interests found.</div>
                        )}
                    </div>
                </div>
            )}
            {isOwner && (
                <Link
                    href='/profile/editProfile'
                    className='mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500'
                >
                    Edit Profile
                </Link>
            )}
        </Layout>
    );
}

export default Profile;
