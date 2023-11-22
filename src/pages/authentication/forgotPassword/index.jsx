import Head from "next/head";
import React from "react";

import ForgotPassword from "@/components/reusableComponents/ForgotPassword";

import Layout from "@/layout/Layout";

export default function forgotPassword() {
    return (
        <Layout>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <ForgotPassword />
        </Layout>
    );
}
