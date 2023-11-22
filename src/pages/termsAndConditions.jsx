import Head from "next/head";
import * as React from "react";

import TermsAndConditions from "@/components/createEventPageComponents/TermsAndConditions";

import Layout from "@/layout/Layout";

export default function usageTerms() {
    return (
        <Layout>
            <Head>
                <title>Terms And Conditions</title>
            </Head>
            <TermsAndConditions />
        </Layout>
    );
}
