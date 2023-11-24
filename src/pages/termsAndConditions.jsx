import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import TermsAndConditions from "@/components/createEventPageComponents/TermsAndConditions";

import Layout from "@/layout/Layout";

export default function UsageTerms() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Head>
                <title> {t("indxTerms.title")} </title>
                <meta name='description' content={t("indxTerms.description")} />
                <meta name='keywords' content={t("indxTerms.keywords")} />
            </Head>

            <TermsAndConditions />
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
