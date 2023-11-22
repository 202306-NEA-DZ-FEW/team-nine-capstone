import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import EventList from "@/components/eventsPageComponents/EventList";

import Layout from "@/layout/Layout";

function Event() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Head>
                <title>Our Events</title>
            </Head>
            <div>
                <EventList />
            </div>
        </Layout>
    );
}

export default Event;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
