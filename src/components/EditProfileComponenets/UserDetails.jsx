import { updateProfile } from "firebase/auth";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { getUserDocument, updateUserDocument } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

import AvatarInput from "./AvatrInput";
import LocationInput from "../reusableComponents/LocationInput";

function UserDetails() {
    const { t } = useTranslation("common");
    const { user } = useUser();
    const [userData, setUserData] = useState({
        displayName: "",
        fullName: "",
        location: "",
        avatar: "",
        userInterests: [],
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    //get user details if there is any from data base to populate input
    useEffect(() => {
        if (user) {
            getUserDocument(user.uid)
                .then((doc) => {
                    if (doc.exists) {
                        setUserData((prevUserData) => ({
                            ...prevUserData,
                            ...doc.data(),
                            userInterests: doc.data().userInterests || [], // Initialize as an empty array
                        }));
                    }
                })
                .catch((error) => {
                    error;
                });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    // Function to handle location selection
    const handleLocationSelect = (selectedLocation) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            location: selectedLocation,
        }));
    };

    // Function to update avatar URL
    const updateAvatarUrl = (downloadURL) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            avatar: downloadURL,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserDocument(user.uid, userData)
            .then(() => {
                // Update display name in authentication
                updateProfile(user, { displayName: userData.displayName });
                setSuccessMessage(t("editProfile.succUpdate"));
            })
            .catch((error) => {
                setError(t("editProfile.failUpdate") + error.message);
            });
    };

    // Function to handle interest selection
    const handleInterestClick = (interest) => {
        const updatedInterests = [...userData.userInterests];
        const index = updatedInterests.indexOf(interest);

        if (index === -1) {
            updatedInterests.push(interest);
        } else {
            updatedInterests.splice(index, 1);
        }

        setUserData((prevUserData) => ({
            ...prevUserData,
            userInterests: updatedInterests,
        }));
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
        <div className='flex'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col md:flex-row w-full sm:w-[95%] bg-white bg-opacity-50 rounded-lg m-2'
            >
                {/* left side */}
                <div className='bg-gray-800 w-full md:w-1/2 h-auto md:h-full rounded-lg '>
                    <AvatarInput
                        avatar={userData.avatar}
                        onUpdateAvatar={updateAvatarUrl}
                    />
                </div>
                {/*righ side */}
                <div>
                    <div className='flex-col'>
                        <div className=''>
                            <div className='flex flex-col md:flex-row justify-start items-center p-2'>
                                <label
                                    htmlFor='displayName'
                                    className='md:w-40 text-lg'
                                >
                                    {t("editProfile.DisplayName")}{" "}
                                </label>
                                <input
                                    className='g-white bg-opacity-50 border-2 border-black focus:bg-green-400 focus:bg-opacity-80  text-black text-lg rounded-lg p-2'
                                    type='text'
                                    id='displayName'
                                    name='displayName'
                                    placeholder='Enter a User Name'
                                    value={userData.displayName || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col md:flex-row justify-start items-center p-2'>
                                <label
                                    htmlFor='fullName'
                                    className='md:w-40 text-lg'
                                >
                                    {t("editProfile.FullName")}{" "}
                                </label>
                                <input
                                    className='bg-white bg-opacity-50 border-2 border-black focus:bg-green-400 focus:bg-opacity-80  text-black text-lg rounded-lg p-2'
                                    type='text'
                                    id='fullName'
                                    name='fullName'
                                    placeholder='Enter Full Name'
                                    value={userData.fullName || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <LocationInput
                                    initialLocation={userData.location}
                                    onSelectLocation={handleLocationSelect}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col align-middle justify-start items-center p-2'>
                        <label
                            htmlFor='interests'
                            className='text-lg p-2 underline'
                        >
                            {t("profile.Interests")}
                        </label>
                        <div className='flex flex-wrap justify-center items-start'>
                            {interestList.map((interest) => (
                                <div
                                    key={interest.title}
                                    className={`flex flex-col items-center basis-1/2 sm:basis-1/4 md:basis-1/6 mr-4 mb-4 text-center justify-center border-4 rounded-lg  w-40 h-14 p-2 m-2' ${
                                        userData.userInterests.includes(
                                            interest.title
                                        )
                                            ? "bg-green-500 text-white text-lg font-bold border-amber-400 hover:text-base"
                                            : "bg-green-300 bg-opacity-80 hover:text-lg hover:border-amber-400"
                                    }`}
                                    onClick={() =>
                                        handleInterestClick(interest.title)
                                    }
                                >
                                    {interest.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-end relative right-5'>
                        <button
                            type='submit'
                            className='flex justify-center bg-amber-400 w-32 text-white text-center p-2 my-2 rounded cursor-pointer hover:bg-amber-300 hover:font-semibold hover:text-black'
                        >
                            {t("editProfile.UpdateProfile")}
                        </button>
                    </div>
                    {error && (
                        <div className='flex justify-center items-center'>
                            <p className='text-red-500 border-white w-fit bg-red-300 justify-center items-center rounded-lg slide-in'>
                                {error}
                            </p>
                        </div>
                    )}
                    {successMessage && (
                        <div className='flex relative justify-center items-center'>
                            <p className='text-green-500 border-white bg-green-200 justify-center items-center w-fit rounded-lg slide-in'>
                                {successMessage}
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default UserDetails;
