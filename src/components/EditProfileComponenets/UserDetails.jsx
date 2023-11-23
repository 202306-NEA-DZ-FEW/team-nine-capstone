import { updateProfile } from "firebase/auth";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

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

    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleInterestChange = (selectedOptions) => {
        setSelectedInterests(selectedOptions.map((option) => option.value));
    };

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
                        setSelectedInterests(doc.data().userInterests || []);
                    }
                })
                .catch((error) => {
                    setError(error);
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
                                value={userData.DisplayName || ""}
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
                                value={userData.FullName || ""}
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

                        <div className='flex flex-col'>
                            <label htmlFor='interests' className='text-lg'>
                                {t("profile.Interests")}
                            </label>
                            <div className='md:w-80'>
                                <MultiSelect
                                    options={interestList.map((interest) => ({
                                        label: interest.title,
                                        value: interest.title,
                                    }))}
                                    value={userData.userInterests.map(
                                        (interest) => ({
                                            label: interest,
                                            value: interest,
                                        })
                                    )}
                                    onChange={handleInterestChange}
                                    labelledBy='Select'
                                />
                            </div>
                            <p className='text-sm mt-2 mb-2'>
                                Selected Interests: {selectedInterests.length}
                            </p>
                            <div className='hidden lg:flex flex-wrap gap-2'>
                                {selectedInterests.map((interest) => (
                                    <div
                                        key={interest}
                                        className='bg-green-900 text-white rounded-md px-2 py-1'
                                    >
                                        {interest}
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
