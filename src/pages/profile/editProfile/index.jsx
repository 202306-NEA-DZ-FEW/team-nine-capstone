import EditSignInDetailes from "@/components/EditProfileComponenets/updateSignInDetails";
import UserDetails from "@/components/EditProfileComponenets/UserDetails";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

function EditProfile() {
    const { user } = useUser();
    console.log(user);

    return (
        <Layout>
            <UserDetails />
            <EditSignInDetailes />
        </Layout>
    );
}

export default EditProfile;
