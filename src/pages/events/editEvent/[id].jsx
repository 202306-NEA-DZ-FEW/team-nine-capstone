import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { getAllEventIds } from "@/lib/firebase/eventsIds";

import EventEdit from "@/components/singlEventPageComponents/EditEvent";

import Layout from "../../../layout/Layout";

function editEvent() {
    return (
        <Layout>
            <EventEdit />
        </Layout>
    );
}

export default editEvent;

export async function getStaticPaths() {
    const paths = await getAllEventIds();

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
