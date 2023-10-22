import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import SectionTwo from "@/components/homepage/SectionTwo";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

export default function HomePage() {
    const { user } = useUser();
    const { t } = useTranslation("common");
    // console.log(user)  // context test

    return (
        <Layout>
            {user ? "we're here" : "we're not here" /*context test*/}
            <br />
            {t("footer.hook") /*translation test*/}
            <Link href='/createEvent' className='border border-orange-600'>
                {" "}
                Create an Event !
            </Link>
            <SectionTwo />
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
