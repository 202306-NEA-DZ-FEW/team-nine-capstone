import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import CreateEvent from "@/components/createEventPageComponents/CreateEvent";

import Layout from "@/layout/Layout";

function createTheEvent() {
    return (
        <Layout>
            <Head>
                <title>Host an Event</title>
            </Head>
            <CreateEvent />
        </Layout>
    );
}

export default createTheEvent;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
