import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";

import { getUserDocument } from "@/lib/firebase/controller";
import { getAllUserIds } from "@/lib/firebase/users";

import UserProfileEventCard from "@/components/reusableComponents/UserProfileEventCard";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

function Profile() {
    const { user } = useUser();
    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation("common");

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
                error;
            }
        };

        fetchUserData();
    }, [id]);

    const shuffleArray = (array) => {
        // Copy the original array to avoid modifying it directly
        const shuffledArray = [...array];

        // Loop through the array in reverse order
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            // Generate a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements at i and j indices
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }

        return shuffledArray;
    };

    return (
        <Layout>
            {userData && (
                <div className='flex flex-col '>
                    <div className='flex flex-col sm:flex-row justify-center items-center mx-10'>
                        {/* first profile section*/}
                        <div className=' md:w-1/4  sm:w-1/2 mx-10 mt-10 bg-yellow-500 w-full'>
                            <div className='flex justify-center mt-10'>
                                {userData.avatar ? (
                                    <div className='flex flex-col items-center'>
                                        <Image
                                            src={userData.avatar}
                                            alt='Avatar'
                                            className='rounded-full border-yellow-400 border-8 w-30 h-30 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                            width={120}
                                            height={120}
                                        />
                                        <div className='w-3/4 sm:w-1/2 justify-center text-center  '>
                                            <h1 className='flex justify-around items-center text-3xl font-normal text-white p-2'>
                                                {userData.displayName}
                                            </h1>
                                        </div>
                                        <div className='w-3/4 sm:w-1/2 justify-center text-center  '>
                                            <h1 className='flex justify-around items-center text-3xl font-normal text-white p-2'>
                                                {userData.currentEmail}
                                            </h1>
                                        </div>
                                        <div className='flex justify-center text-center bg-white hover:bg-yellow-400 mt-16'>
                                            <h1 className='flex items-center text-xl font-normal text-gray-400 '>
                                                {isOwner && (
                                                    <Link
                                                        href={`/profile/${id}/editProfile`}
                                                    >
                                                        <div className='flex justify-center items-center ml-2 w-72 bg-white'>
                                                            <span>
                                                                {t(
                                                                    "profile.ep"
                                                                )}
                                                            </span>
                                                            <LiaUserEditSolid className='ml-2 hover:rounded-full hover:bg-black hover:text-white' />
                                                        </div>
                                                    </Link>
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <Image
                                            src='/images/defaultUser.png'
                                            alt='Default'
                                            className='rounded-full border-yellow-400 border-8 w-30 h-30 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                            width={120}
                                            height={120}
                                        />
                                        <div className='w-3/4 sm:w-1/2 justify-center text-center mt-3'>
                                            <h1 className='flex justify-around items-center text-3xl font-bold p-2 rounded-t-lg bg-amber-400'>
                                                {userData.displayName}
                                                {isOwner && (
                                                    <Link
                                                        href={`/profile/${id}/editProfile`}
                                                    >
                                                        <LiaUserEditSolid className='justify-end hover:rounded-full hover:bg-black hover:text-white' />
                                                    </Link>
                                                )}
                                            </h1>
                                        </div>
                                        <div className='w-3/4 sm:w-1/2 justify-center text-center mt-3'>
                                            <h1 className='flex justify-around items-center text-3xl font-bold p-2 rounded-t-lg bg-amber-400'>
                                                {userData.currentEmail}
                                                {isOwner && (
                                                    <Link
                                                        href={`/profile/${id}/editProfile`}
                                                    >
                                                        <LiaUserEditSolid className='justify-end hover:rounded-full hover:bg-black hover:text-white' />
                                                    </Link>
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* second profile section */}
                        <div className='grid justify-center bg-white mt-10 md:w-3/4'>
                            <div className='flex h-24 m-2 bg-yellow-400 items-center'>
                                <h1 className='font-semibold text-2xl ml-10'>
                                    {t("profile.pro")}
                                </h1>
                            </div>
                            <div className='flex flex-col p-2 sm:text-lg sm:flex-row my-3'>
                                <div className='w-full sm:w-1/3 font-semibold'>
                                    {t("profile.Full Name")}
                                </div>
                                <div className='w-full sm:w-2/3 mt-2 sm:mt-0'>
                                    {userData.fullName}
                                </div>
                            </div>
                            <div className='flex flex-col p-2 sm:text-lg sm:flex-row my-3'>
                                <div className='w-full sm:w-1/3 font-semibold'>
                                    {t("profile.Location")}
                                </div>
                                <div className='w-full sm:w-2/3 mt-2 sm:mt-0'>
                                    {userData.location}
                                </div>
                            </div>
                            <div className='flex flex-col p-2 sm:text-lg sm:flex-row justify-start items-start my-3 font-semibold'>
                                <div className='w-full sm:w-1/3'>
                                    {t("profile.Interests")}
                                </div>
                                {userData.userInterests &&
                                userData.userInterests.length > 0 ? (
                                    <div className='flex flex-wrap items-start justify-start '>
                                        {userData.userInterests.map(
                                            (interest) => (
                                                <div
                                                    key={interest}
                                                    className='flex flex-col sm:flex-row w-full sm:w-fit h-10 p-2 m-2 items-center text-center justify-center  rounded-md border-neutral-400 border-2'
                                                >
                                                    {interest}
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className='w-full sm:w-2/3 mt-2 sm:mt-0'>
                                        {isOwner ? (
                                            <div>
                                                {t("profile.noIntrests")}{" "}
                                                <Link
                                                    className='text-blue-700 underline hover:font-semibold hover:rounded-md hover:bg-yellow-400 px-2'
                                                    href={`/profile/${id}/editProfile`}
                                                >
                                                    {t("profile.ep")}
                                                </Link>{" "}
                                                {t("profile.toaddsome")}
                                            </div>
                                        ) : (
                                            <div>
                                                {t(
                                                    "profile.No interests found."
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='grow shrink m-2 h-0.5 bg-stone-900' />
                    {/* divider */}

                    {/* third profile section */}

                    {userData.iEvents && userData.iEvents.length > 0 ? (
                        <div className='flex flex-col items-center justify-center '>
                            <div className='text-lg font-semibold'>
                                {" "}
                                {userData.displayName}{" "}
                                {t("profile.recentEvents")}{" "}
                            </div>
                            <div className='flex flex-wrap my-5 p-1'>
                                {shuffleArray(userData.iEvents)
                                    .slice(0, 4)
                                    .map((event) => (
                                        <div key={event}>
                                            <UserProfileEventCard id={event} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <div className='text-lg font-semibold flex flex-col items-center justify-center my-5'>
                            {" "}
                            {userData.displayName} {t("profile.noEvent")}{" "}
                            {isOwner && (
                                <div>
                                    <Link
                                        href='/createTheEvent'
                                        className='text-blue-700 underline hover:font-semibold hover:rounded-md hover:bg-yellow-400 px-2'
                                    >
                                        {t("createEvent.title")}{" "}
                                    </Link>
                                    {t("profile.orCheck")}{" "}
                                    <Link
                                        href='/events'
                                        className='text-blue-700 underline hover:font-semibold hover:rounded-md hover:bg-yellow-400 px-2'
                                    >
                                        {t("Events")}
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                    {userData.iEvents && userData.iEvents.length > 0 && (
                        <Link
                            className='flex flex-end items-end justify-end mr-10 mb-10'
                            href={`/profile/${id}/events`}
                        >
                            <button className='rounded-sm py-2 px-3 text-white text-xl hover:font-semibold hover:text-black focus:font-semibold focus:text-black bg-green-400 hover:bg-opacity-50 focus:border-2 focus:border-black'>
                                {" "}
                                {t("profile.seeMore")} {userData.displayName}
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default Profile;

export async function getStaticPaths() {
    const paths = await getAllUserIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
