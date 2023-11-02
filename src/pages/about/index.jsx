import { useTranslation } from "next-i18next";

import AboutUs from "@/components/aboutus/AboutUs";

import Layout from "@/layout/Layout";

const About = () => {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <AboutUs />
        </Layout>
    );
};
export default About;
