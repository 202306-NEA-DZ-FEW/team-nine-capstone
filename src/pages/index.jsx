import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import HeroSection from "@/components/homepage/HeroSection";
import HowitWorks from "@/components/homepage/HowitWorks";
import SectionTwo from "@/components/homepage/SectionTwo";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

export default function HomePage({ props }) {
    const { user } = useUser();
    const { t } = useTranslation("common");

    return (
        <>
            <Head>
                <title>{t("indxHomePage.title")}</title>
                <meta
                    name='description'
                    content={t("indxHomePage.description")}
                />
                <meta name='keywords' content={t("indxHomePage.keywords")} />
            </Head>
            <HeroSection />
            <Layout>
                <HowitWorks />
                <SectionTwo />
            </Layout>
        </>
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
