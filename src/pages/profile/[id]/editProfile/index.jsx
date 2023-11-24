import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getAllUserIds } from "@/lib/firebase/users";

import EditSignInDetailes from "@/components/EditProfileComponenets/updateSignInDetails";
import UserDetails from "@/components/EditProfileComponenets/UserDetails";

import Layout from "@/layout/Layout";

function EditProfile() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Head>
                <title>{t("indxEditProfile.title")}</title>

                <meta
                    name='description'
                    content={t("indxEditProfile.description")}
                />
                <meta name='keywords' content={t("indxEditProfile.keywords")} />
            </Head>
            <div className='bg-gray-300'>
                <UserDetails />
                <EditSignInDetailes />
            </div>
        </Layout>
    );
}

export default EditProfile;

export async function getStaticPaths() {
    const paths = await getAllUserIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
