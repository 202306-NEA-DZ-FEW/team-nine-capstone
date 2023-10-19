import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

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
