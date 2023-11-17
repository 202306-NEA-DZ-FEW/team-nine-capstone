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

    return (
        <Layout>
            {userData && (
                <div className='flex flex-col '>
                    {/* first profile section*/}
                    <div className='relative py-5 bg-green-700 bg-opacity-50 w-full '>
                        <div className='flex flex-col sm:flex-row group justify-center items-center align-middle space-x-10 z-10 '>
                            {userData.avatar ? (
                                <image
                                    src={userData.avatar}
                                    alt='Avatar'
                                    className='rounded-full border-orange-400 border-2 w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 hover:p-4'
                                />
                            ) : (
                                <image
                                    src='/images/defaultUser.png'
                                    alt='Default Avatar'
                                    className='rounded-full border-orange-400 border-2 w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                />
                            )}
                            <div className='w-3/4 sm:w-1/2 justify-center text-center '>
                                <h1 className=' flex justify-around items-center text-3xl font-bold mt-3 p-2 rounded-t-lg bg-amber-400'>
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
                        </div>
                    </div>

                    {/* second profile section */}
                    <div>
                        <div className='flex p-2 ml-10 sm:text-lg sm:flex-row flex-col justify-start items-start my-3'>
                            <div className='w-48'>{t("profile.Full Name")}</div>{" "}
                            <div className='font-semibold '>
                                {userData.fullName}
                            </div>
                        </div>
                        <div className='flex p-2 ml-10 sm:text-lg sm:flex-row flex-col justify-start items-start my-3'>
                            <div className='w-48'>{t("profile.Location")}</div>
                            <div className='font-semibold '>
                                {userData.location}
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center text-lg font-semibold'>
                            {t("profile.Interests")}{" "}
                            {userData.userInterests &&
                            userData.userInterests.length > 0 ? (
                                <div className='flex flex-wrap items-center justify-center'>
                                    {userData.userInterests.map((interest) => (
                                        <div
                                            key={interest}
                                            className='flex flex-col sm:flex-row w-40 h-14 p-2 m-2 items-center text-center justify-center border-transparent rounded-lg bg-green-500 hover:bg-green-700 hover:text-white'
                                        >
                                            {interest}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {isOwner ? (
                                        <div>
                                            {t("profile.noIntrests")}{" "}
                                            <Link
                                                className='text-indigo-800 underline hover:font-semibold hover:rounded-lg hover:bg-orange-300'
                                                href={`/profile/${id}/editProfile`}
                                            >
                                                {t("profile.ep")}
                                            </Link>{" "}
                                            {t("profile.toaddsome")}
                                        </div>
                                    ) : (
                                        <div>
                                            {t("profile.No interests found.")}
                                        </div>
                                    )}
                                </div>
                            )}
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
                                {userData.iEvents.map((event) => (
                                    <div key={event}>
                                        <UserProfileEventCard id={event} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='text-lg font-semibold'>
                            {" "}
                            {userData.displayName} has not joined any events{" "}
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
