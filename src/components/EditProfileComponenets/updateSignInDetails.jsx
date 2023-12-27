import {
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { updateUserDocument, userCollection } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function UpdateSignInDetailes() {
    const { t } = useTranslation("common");
    const { user, setUser } = useUser();
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    const handleCurrentEmailChange = (e) => {
        setCurrentEmail(e.target.value);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleDelete = async () => {
        try {
            const credential = EmailAuthProvider.credential(
                currentEmail,
                currentPassword
            );
            await reauthenticateWithCredential(user, credential);

            // Delete the user's account and database document
            await deleteUser(user);
            await deleteDoc(doc(userCollection, user.uid));

            setSuccessMessage("We are sad to see you leaving our community");
            router.push("/");
        } catch (error) {
            setError(
                "There was an error while deleting your account: " +
                    error.message
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credential = EmailAuthProvider.credential(
                currentEmail,
                currentPassword
            );
            await reauthenticateWithCredential(user, credential);

            if (newPassword !== "") {
                if (newPassword === confirmPassword) {
                    await updatePassword(user, newPassword);
                } else {
                    setError("New password and confirm password must match.");
                }
            }

            setUser(user);

            if (newPassword !== "") {
                updateUserDocument(user.uid, {
                    email: currentEmail,
                    password: newPassword,
                })
                    .then(() => {
                        setSuccessMessage(
                            "Your Authentification Crudentials were updated successfully"
                        );
                    })
                    .catch((error) => {
                        setError(
                            "Error updating user document: " + error.message
                        );
                    });
            }

            setCurrentEmail("");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError(null);
            setSuccessMessage(null);
        } catch (error) {
            setError("Error updating credentials: " + error.message);
        }
    };

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    return (
        <div className='flex flex-col bg-bgc-silver '>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col md:flex-row w-full sm:w-[95%] rounded-lg justify-center'
            >
                <div className='md:w-1/5 mx-10 mb-10 bg-white'></div>
                <div className='grid gap-8 justify-center bg-white p-2 md:w-3/4 mb-10'>
                    <p className='flex justify-center font-semibold text-3xl '>
                        {t("editProfile.CRUDtitle")}
                    </p>
                    <span className='flex justify-center text-lg'>
                        {t("editProfile.CRUDreq")}
                    </span>
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-8'>
                        <div className='flex flex-col'>
                            <label
                                htmlFor='currentEmail'
                                className='text-black'
                            >
                                {t("editProfile.CRUDmail")}
                            </label>
                            <input
                                className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                                type='email'
                                value={currentEmail}
                                onChange={handleCurrentEmailChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label
                                htmlFor='currentPassword'
                                className='text-black'
                            >
                                {t("editProfile.CRUDpassword")}
                            </label>
                            <input
                                className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                                type='password'
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-8'>
                        <div className='flex flex-col'>
                            <label htmlFor='newPassword' className='text-black'>
                                {t("editProfile.CRUDnew1")}
                            </label>
                            <input
                                className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                                type='password'
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                minLength='8'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label
                                htmlFor='confirmPassword'
                                className='text-black'
                            >
                                {t("editProfile.CRUDnew2")}
                            </label>
                            <input
                                className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                                type='password'
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                minLength='8'
                            />
                        </div>
                    </div>

                    {error && (
                        <div className='flex justify-center items-center'>
                            <p className='text-red-500 bg-red-300 rounded-lg p-2'>
                                {error}
                            </p>
                        </div>
                    )}
                    {successMessage && (
                        <div className='flex justify-center items-center'>
                            <p className='text-green-500 bg-green-200 rounded-lg p-2'>
                                {successMessage}
                            </p>
                        </div>
                    )}
                    <div className='grid grid-cols-2 md:grid-cols-2 md:gap-x-8'>
                        <div className='flex justify-center'>
                            <button
                                className='bg-green-500 text-white p-2 my-2 rounded cursor-pointer hover:font-semibold hover:text-black'
                                type='submit'
                            >
                                {t("editProfile.CRUDsav")}
                            </button>
                        </div>

                        <div className='flex justify-center'>
                            <button
                                className='bg-red-700 text-white p-2 my-2 rounded cursor-pointer hover:font-semibold hover:text-black'
                                onClick={handleDelete}
                            >
                                {t("editProfile.CRUDdel")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateSignInDetailes;
