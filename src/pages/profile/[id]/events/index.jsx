import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import { getEventDocument, getUserDocument } from "@/lib/firebase/controller";
import { getAllUserIds } from "@/lib/firebase/users";

import EventCard from "@/components/eventsPageComponents/EventCard";

import Layout from "@/layout/Layout";

function Events() {
    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation("common");

    const [eventData, setEventData] = useState(null);
    const [userData, setUserData] = useState(null);

    // fetch user data including the events lists
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

    // Fetch event data for each event ID in userData.iEvents
    useEffect(() => {
        if (userData && userData.iEvents) {
            userData.iEvents.forEach(async (eventId) => {
                try {
                    const eventDoc = await getEventDocument(eventId);
                    if (eventDoc.exists()) {
                        setEventData(eventDoc.data());
                        //console.log(eventData)
                    }
                } catch (error) {
                    error;
                }
            });
        }
    }, [userData, eventData]);

    return (
        <Layout>
            <Head>
                <title>{t("indxMyEvents.title")}</title>

                <meta
                    name='description'
                    content={t("indxMyEvents.description")}
                />
                <meta name='keywords' content={t("indxMyEvents.keywords")} />
            </Head>
            {userData && (
                <div className='flex flex-col'>
                    {/* first section*/}
                    <div className='relative py-5 bg-white m-5 '>
                        <div className='flex flex-col sm:flex-row group justify-center items-center align-middle  '>
                            {userData.avatar ? (
                                <Image
                                    src={userData.avatar}
                                    alt='Avatar'
                                    className='rounded-full border-yellow-400 border-8 mr-4 w-30 h-30 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                    width={120}
                                    height={120}
                                />
                            ) : (
                                <Image
                                    src='/images/defaultUser.png'
                                    alt='Default'
                                    className='rounded-full border-yellow-400 mr-4 border-8 w-30 h-30 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                                    width={120}
                                    height={120}
                                />
                            )}

                            <div className='w-3/4 sm:w-1/2 justify-center text-center '>
                                <h1 className='justify-center items-center text-3xl font-bold mt-3 p-2 rounded-t-lg bg-yellow-500'>
                                    {userData.displayName}
                                </h1>
                                <h1 className=' bg-yellow-500 opacity-50 rounded-b-lg p-2'>
                                    {userData.displayName}{" "}
                                    {t("profileEvent.eventAmount")}{" "}
                                    {userData.iEvents &&
                                    userData.iEvents.length > 0
                                        ? userData.iEvents.length
                                        : 0}{" "}
                                    {t("profileEvent.event")}
                                </h1>
                            </div>
                        </div>
                    </div>
                    {/*second section*/}
                    <Link
                        className='flex flex-end items-end justify-end mr-10 mb-5 mt-5'
                        href={`/profile/${id}/`}
                    >
                        <button className='rounded-sm py-2 px-3 text-white text-xl hover:font-semibold hover:text-black focus:font-semibold focus:text-black bg-green-500 hover:bg-opacity-80 focus:border-2 focus:border-black'>
                            {" "}
                            {t("profileEvent.goback")} {userData.displayName}{" "}
                            {t("profileEvent.profile")}
                        </button>
                    </Link>
                    {/* users events list */}
                    {userData.iEvents && userData.iEvents.length > 0 ? (
                        <div>
                            <div className='w-[95%] ml-10'>
                                {userData.iEvents.map((eventId) => (
                                    <div key={eventId}>
                                        <EventCard TheEvent={eventId} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>{t("profileEvent.noEvents")}</div>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default Events;

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
