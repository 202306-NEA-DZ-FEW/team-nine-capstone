import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";
import Link from "next/link";

function Profile() {
    const { user } = useUser();
    // const { t } = useTranslation("common");
    console.log(user);

    return (
        <Layout>
            <div>Welcome </div>
            {user ? (
                <Link
                    className='mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500'
                    href='/profile/editProfile'
                >
                    Edit Profile
                </Link>
            ) : (
                ""
            )}
        </Layout>
    );
}

export default Profile;
