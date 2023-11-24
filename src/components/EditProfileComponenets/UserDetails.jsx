import { updateProfile } from "firebase/auth";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { getUserDocument, updateUserDocument } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

import AvatarInput from "./AvatarInput";
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

    useEffect(() => {
        if (user) {
            getUserDocument(user.uid)
                .then((doc) => {
                    if (doc.exists) {
                        setUserData((prevUserData) => ({
                            ...prevUserData,
                            ...doc.data(),
                            userInterests: doc.data().userInterests || [],
                        }));
                    }
                })
                .catch((error) => {
                    setError(error);
                });
        }
    }, [user]);

    const handleInputChange = (e, selectedInterets) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
            userInterests: selectedInterets
                ? selectedInterets.map((interest) => interest.value)
                : [],
        }));
    };

    const handleLocationSelect = (selectedLocation) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            location: selectedLocation,
        }));
    };

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
        <div className='flex bg-bgc-silver'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col md:flex-row w-full sm:w-[95%] rounded-lg justify-center'
            >
                <div className='md:w-1/5 mt-10 mx-10 bg-white'>
                    <AvatarInput
                        avatar={userData.avatar}
                        onUpdateAvatar={updateAvatarUrl}
                    />
                </div>

                <div className='grid gap-8 justify-center bg-white p-10 mt-10 md:w-3/4'>
                    <h1 className=' flex text-3xl justify-center font-semibold text-black p-2'>
                        {t("profile.pro")}
                    </h1>

                    {/* First Row */}
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8'>
                        <div className='flex flex-col mb-4 md:mb-0'>
                            <label htmlFor='displayName' className='text-lg'>
                                {t("editProfile.DisplayName")}
                            </label>
                            <input
                                className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                                type='text'
                                id='displayName'
                                name='displayName'
                                placeholder='Display Name'
                                value={userData.displayName || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='fullName' className='text-lg'>
                                {t("editProfile.FullName")}
                            </label>
                            <input
                                className='bg-white rounded-sm border-2 text-black text-lg p-1 md:w-80'
                                type='text'
                                id='fullName'
                                name='fullName'
                                placeholder='Full Name'
                                value={userData.fullName || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8'>
                        <div className='flex flex-col mb-4 md:mb-0'>
                            <LocationInput
                                initialLocation={userData.location}
                                onSelectLocation={handleLocationSelect}
                            />
                        </div>

                        <div className='flex flex-col p-2'>
                            <label
                                htmlFor='interests'
                                className='text-lg p-2 underline'
                            >
                                {t("profile.Interests")}
                            </label>
                            <div className='grid grid-cols-3 gap-2 mr-6'>
                                {interestList.map((interest) => (
                                    <div
                                        key={interest.title}
                                        className={`flex flex-col col items-center w-full h-12 p-2 m-2 text-center justify-center border-4 rounded-lg ${
                                            userData.userInterests.includes(
                                                interest.title
                                            )
                                                ? "bg-green-500 text-white text-sm font-semibold"
                                                : " hover:text-sm"
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
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className='bg-amber-400 w-32 text-white text-center p-2  rounded cursor-pointer  hover:font-semibold hover:text-black'
                        >
                            {t("editProfile.UpdateProfile")}
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>
                        <hr className='border-t border-4 border-gray w-full' />
                    </div>
                    {error && (
                        <div className='flex justify-center items-center mt-4'>
                            <p className='text-red-500 border-white w-fit bg-red-300 justify-center items-center rounded-lg slide-in'>
                                {error}
                            </p>
                        </div>
                    )}

                    {successMessage && (
                        <div className='flex justify-center items-center mt-4'>
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
