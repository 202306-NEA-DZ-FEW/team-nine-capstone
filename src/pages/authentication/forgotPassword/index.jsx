import React from "react";

import ForgotPassword from "@/components/reusableComponents/ForgotPassword";
import IndexPage from "@/components/reusableComponents/indexPage";

import Layout from "@/layout/Layout";

export default function forgotPassword() {
    return (
        <Layout>
            <IndexPage title='Forget Password' />
            <ForgotPassword />
        </Layout>
    );
}
