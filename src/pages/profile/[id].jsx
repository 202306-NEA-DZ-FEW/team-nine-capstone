import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";
import { userCollection } from "@/lib/firebase/controller";

function Profile() {
    const { user } = useUser();
    console.log(user);

    // Get the current profile id from the URL
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    // check if the current user is the profile owner
    const [isOwner, setIsOwner] = useState(false);
    useEffect(() => {
        if (user && user.uid === id) {
            setIsOwner(true);
            console.log("current user is the owner of the profile", isOwner);
        }
    }),
        [isOwner];

    console.log(isOwner);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(userCollection, id);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    setUserData(userDocSnapshot.data());
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
                <div>
                    <h1>{userData.displayName}</h1>
                    <img src={userData.avatar} alt='Avatar' />
                    <p>Location: {userData.location}</p>
                    <p>Interests: {userData.interest}</p>
                    <p>Full Name: {userData.fullName}</p>
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
