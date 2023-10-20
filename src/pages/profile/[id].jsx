// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

function Profile() {
    const { user } = useUser();
    // const { t } = useTranslation("common");

    console.log(user);
    return (
        <Layout>
            <div>Welcome </div>
        </Layout>
    );
}

export default Profile;

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ["common"])),
//             // Will be passed to the page component as props
//         },
//     };
// }
