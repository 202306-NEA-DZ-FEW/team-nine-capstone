import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getUserDocument } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

function Profile() {
    const { user } = useUser();
    //console.log(user);

    // Get the current profile id from the URL
    const router = useRouter();
    const { id } = router.query;
    //console.log(id);

    // check if the current user is the profile owner
    const [isOwner, setIsOwner] = useState(false);
    useEffect(() => {
        if (user && user.uid === id) {
            setIsOwner(true);
            //console.log("current user is the owner of the profile", isOwner);
        }
    }, [isOwner, id, user]);

    // console.log(isOwner);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getUserDocument(id);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            } catch (error) {
                //console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);
    return (
        <Layout>
            {userData && (
                <div>
                    <h1>{userData.displayName}</h1>
                    <img src={userData.avatar} alt='Avatar' />
                    <div>Location: {userData.location}</div>
                    <div>
                        Interests:{" "}
                        {userData.userInterests.map((interest) => (
                            <div
                                key={interest}
                                className='flex flex-col items-center basis-1/2 sm:basis-1/4 md:basis-1/6 mr-4 mb-4 p-4 border-2 border-gray-300 cursor-pointer hover:font-semibold hover:border-4'
                            >
                                {interest}
                            </div>
                        ))}
                    </div>

                    <div>Full Name: {userData.fullName}</div>
                </div>
            )}
            {isOwner ? (
                <Link
                    className='mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500'
                    href='/profile/editProfile'
                >
                    Edit Profile
                </Link>
            ) : (
                ""
            )}
        </Layout>
    );
}

export default Profile;
