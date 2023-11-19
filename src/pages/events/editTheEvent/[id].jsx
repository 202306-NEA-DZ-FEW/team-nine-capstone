import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { getAllEventIds } from "@/lib/firebase/eventsIds";

import EventEdit from "@/components/singlEventPageComponents/EditEvent";

import Layout from "../../../layout/Layout";

function EditTheEvent() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <EventEdit />
        </Layout>
    );
}

export default EditTheEvent;

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
