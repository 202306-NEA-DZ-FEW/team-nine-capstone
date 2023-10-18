import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Layout from "@/layout/Layout";

export default function HomePage() {
    // console.log("this is proceesenv:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

    const { t } = useTranslation("common");

    return <Layout></Layout>;
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
