import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import ForgotPassword from "@/components/reusableComponents/ForgotPassword";

import Layout from "@/layout/Layout";

export default function ForgotThePassword() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <Head>
                <title>{t("indxReset.title")}</title>

                <meta name='description' content={t("indxReset.description")} />
                <meta name='keywords' content={t("indxReset.keywords")} />
            </Head>
            <ForgotPassword />
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
