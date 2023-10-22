import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    // sendEmailVerification,
    // updateEmail,
    updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

import { updateUserDocument } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function UpdateSignInDetailes() {
    const { user, setUser } = useUser();
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleCurrentEmailChange = (e) => {
        setCurrentEmail(e.target.value);
    };

    // const handleNewEmailChange = (e) => {
    //     setNewEmail(e.target.value);
    // };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Reauthenticate the user with their current credentials
            const credential = EmailAuthProvider.credential(
                currentEmail,
                currentPassword
            );
            console.log(currentEmail);
            await reauthenticateWithCredential(user, credential);

            // if (newEmail !== "") {
            //     await updateEmail(user, newEmail);

            //     await sendEmailVerification(user);
            //     console.log("Verification email sent successfully!");
            //     console.log("Email updated successfully!");
            // }

            //checks if the new password inputs are identical
            if (newPassword !== "") {
                if (newPassword === confirmPassword) {
                    await updatePassword(user, newPassword);
                    toast.success("Password updated successfully!", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    console.log("Password updated successfully!");
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
                        console.log("User document updated successfully!");
                    })
                    .catch((error) => {
                        setError(
                            "Error updating user document: " + error.message
                        );
                    });
            }

            setCurrentEmail("");
            // setNewEmail("");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError(null);
        } catch (error) {
            setError("Error updating credentials: " + error.message);
        }
    };

    return (
        <div className='flex flex-col mt-10'>
            <p className='flex justify-center'>Change Sign-in Credentials</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='currentEmail'>Current Email</label>
                    <input
                        className='border-4 focus:border-black'
                        type='email'
                        value={currentEmail}
                        onChange={handleCurrentEmailChange}
                    />
                </div>
                {/* <div>
                    <label htmlFor='newEmail'>New Email</label>
                    <input
                        className='border-4 focus:border-black'
                        type='email'
                        value={newEmail}
                        onChange={handleNewEmailChange}
                    />
                </div> */}
                <div>
                    <label htmlFor='currentPassword'>Current Password</label>
                    <input
                        className='border-4 focus:border-black'
                        type='password'
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                    />
                </div>
                <div>
                    <label htmlFor='newPassword'>New Password</label>
                    <input
                        className='border-4 focus:border-black'
                        type='password'
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>
                        Confirm New Password
                    </label>
                    <input
                        className='border-4 focus:border-black'
                        type='password'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded'
                    type='submit'
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default UpdateSignInDetailes;
