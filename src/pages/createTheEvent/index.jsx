import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import CreateEvent from "@/components/createEventPageComponents/CreateEvent";

import Layout from "@/layout/Layout";

function CreateTheEvent() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <Head>
                <title>{t("indxHostEvent.title")}</title>

                <meta
                    name='description'
                    content={t("indxHostEvent.description")}
                />
                <meta name='keywords' content={t("indxHostEvent.keywords")} />
            </Head>
            <CreateEvent />
        </Layout>
    );
}

export default CreateTheEvent;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
