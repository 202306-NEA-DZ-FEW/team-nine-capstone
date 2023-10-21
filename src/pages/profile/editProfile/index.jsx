import React from "react";

import UserDetails from "@/components/EditProfileComponenets/UserDetails";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";
import { updateUserDocument } from "@/lib/firebase/controller";

function EditProfile() {
    const { user } = useUser();
    console.log(user);

    return (
        <Layout>
            <UserDetails />
        </Layout>
    );
}

export default EditProfile;
