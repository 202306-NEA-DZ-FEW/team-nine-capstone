import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import AboutUs from "@/components/aboutus/AboutUs";
import IndexPage from "@/components/reusableComponents/indexPage";

import Layout from "@/layout/Layout";

export default function About() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <IndexPage title='About Pebble' />
            <AboutUs />
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
