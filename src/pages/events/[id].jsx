import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { getAllEventIds } from "@/lib/firebase/eventsIds";

import EventDetails from "@/components/singlEventPageComponents/EventDetails";

import Layout from "../../layout/Layout";

function SingleEventPage({ eventData, userData }) {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Head>
                <title>{t("indxEventDetails.title")}</title>

                <meta
                    name='description'
                    content={t("indxEventDetails.description")}
                />
                <meta
                    name='keywords'
                    content={t("indxEventDetails.keywords")}
                />
            </Head>
            <EventDetails eventData={eventData} userData={userData} />
        </Layout>
    );
}

export default SingleEventPage;

export async function getStaticPaths() {
    const paths = await getAllEventIds();

    return {
        paths,
        fallback: true,
    };
}

// export async function getStaticProps({ params, locale }) {
//     try {
//         console.log("im params id", params.id);

//         // Fetch event data based on the event ID
//         const eventDoc = await getEventDocument(params.id);
//         console.log("eventDoc:", eventDoc.data());

//         // Fetch user data based on the creator ID (createdBy)
//         const userDoc = await getUserDocument(eventDoc.data()?.createdBy);
//         console.log("userDoc:", userDoc.data());

//         // Parse the data and return it
//         const eventData = eventDoc.data();
//         const userData = userDoc.data();

//         return {
//             props: {
//                 ...(await serverSideTranslations(locale, ["common"])),
//                 eventData,
//                 userData,
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching data:", error);

//         return {
//             notFound: true,
//         };
//     }
// }
// export async function getStaticProps({ params }) {
//     try {
//         // Fetch event data based on the event ID
//         const eventDoc = await getEventDocument(params.id);

//         // Fetch user data based on the creator ID (createdBy)
//         const userDoc = await getUserDocument(params.createdBy);

//         // Parse the data and return it
//         const eventData = eventDoc.data();
//         const userData = userDoc.data();

//         return {
//             props: {
//                 eventData,
//                 userData,
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching data:", error);

//         return {
//             notFound: true,
//         };
//     }
// }
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
