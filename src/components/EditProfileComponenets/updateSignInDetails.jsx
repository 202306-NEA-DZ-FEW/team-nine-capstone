import {
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

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
            // Reauthenticate the user with their current credentials, must be done, firebase rules
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
            // Reauthenticate the user with their current credentials,  must be done, firebase rules
            const credential = EmailAuthProvider.credential(
                currentEmail,
                currentPassword
            );
            await reauthenticateWithCredential(user, credential);

            //checks if the new password inputs are identical
            if (newPassword !== "") {
                if (newPassword === confirmPassword) {
                    await updatePassword(user, newPassword);
                } else {
                    setError("New password and confirm password must match.");
                }
            }

            // Update the user context with the signed-up user
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

    //effect for notification
    useEffect(() => {
        if (successMessage || error) {
            // After 5 seconds, remove the success message
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000);

            // Clear the timer if the component unmounts or if successMessage changes
            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    return (
        <div className='flex flex-col rounded-md border-red-600 boreder-4 w-[95%] bg-gradient-to-b from-gray-700 justify-center p-4 m-2'>
            <p className='flex justify-center font-extrabold text-2xl underline p-2'>
                {" "}
                ⚠️ {t("editProfile.CRUDtitle")} ⚠️
            </p>
            <span className='flex justify-center font-bold text-lg p-2'>
                {t("editProfile.CRUDreq")}
            </span>
            <form onSubmit={handleSubmit} className='text-lg'>
                <div className='flex flex-col md:flex-row md:space-x-5  items-center p-2'>
                    <label
                        htmlFor='currentEmail'
                        className='md:w-1/6 font-semibold text-white'
                    >
                        {t("editProfile.CRUDmail")}
                        <span className='text-red-600 font-mono '>*</span>
                    </label>
                    <input
                        className='border-4 focus:border-amber-400 focus:border-4 rounded-md p-2 w-52 bg-white focus:bg-green-300 bg-opacity-50'
                        type='email'
                        value={currentEmail}
                        onChange={handleCurrentEmailChange}
                        required
                    />
                </div>
                <div className='flex flex-col md:flex-row md:space-x-5  items-center p-2'>
                    <label
                        htmlFor='currentPassword'
                        className='md:w-1/6 font-semibold text-white'
                    >
                        {t("editProfile.CRUDpassword")}
                        <span className='text-red-600 font-mono '>*</span>
                    </label>
                    <input
                        className='border-4 focus:border-amber-400 focus:border-4 rounded-md p-2 w-52 bg-white focus:bg-green-300 bg-opacity-50'
                        type='password'
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        required
                    />
                </div>
                <div className='flex flex-col md:flex-row md:space-x-5  items-center p-2'>
                    <label
                        htmlFor='newPassword'
                        className='md:w-1/6 font-semibold text-white'
                    >
                        {t("editProfile.CRUDnew1")}
                    </label>
                    <input
                        className='border-4 focus:border-amber-400 focus:border-4 rounded-md p-2 w-52 bg-white focus:bg-green-300 bg-opacity-50'
                        type='password'
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        minLength='8'
                    />
                </div>
                <div className='flex flex-col md:flex-row md:space-x-5  items-center p-2'>
                    <label
                        htmlFor='confirmPassword'
                        className='md:w-1/6 font-semibold text-white'
                    >
                        {t("editProfile.CRUDnew2")}
                    </label>
                    <input
                        className='border-4 focus:border-amber-400 focus:border-4 rounded-md p-2 w-52 bg-white focus:bg-green-300 bg-opacity-50'
                        type='password'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        minLength='8'
                    />
                </div>
                {error && (
                    <div className='flex justify-center items-center'>
                        <p className='text-red-500 border-white w-fit bg-red-300 rounded-lg slide-in'>
                            {error}
                        </p>
                    </div>
                )}
                {successMessage && (
                    <div className='flex justify-center items-center'>
                        <p className='text-green-500 border-white bg-green-200 w-fit rounded-lg slide-in'>
                            {successMessage}
                        </p>
                    </div>
                )}
                <div className='flex justify-end'>
                    <button
                        className='flex justify-center bg-amber-400 w-auto text-white text-center p-2 my-2 rounded cursor-pointer hover:font-semibold hover:bg-amber-300 hover:text-black'
                        type='submit'
                    >
                        {t("editProfile.CRUDsav")}
                    </button>
                </div>
                <div className='flex justify-center items-center p-2'>
                    <hr className='border-t border-4 border-white w-full' />
                </div>
                <div className='flex justify-end'>
                    <button
                        className='flex justify-center item-end bg-red-700 w-auto text-white text-center p-2 my-2 rounded cursor-pointer hover:font-semibold hover:text-black'
                        onClick={handleDelete}
                    >
                        {t("editProfile.CRUDdel")}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateSignInDetailes;
