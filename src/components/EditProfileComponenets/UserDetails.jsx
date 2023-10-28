import { updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { getUserDocument, updateUserDocument } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

import AvatarInput from "./AvatrInput";
import LocationInput from "../reusableComponents/LocationInput";

function UserDetails() {
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
                setSuccessMessage(
                    "Your Account Detailes have been update succefully"
                );
            })
            .catch((error) => {
                setError(
                    "There was an error while updating your account details: " +
                        error.message
                );
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
        <div className='flex flex-col w-screen'>
            <form onSubmit={handleSubmit}>
                <AvatarInput
                    avatar={userData.avatar}
                    onUpdateAvatar={updateAvatarUrl}
                />
                <div className='flex flex-col md:flex-row md:space-x-10 justify-center'>
                    <div className='flex flex-col md:flex-row md:space-x-5 justify-start items-center p-2'>
                        <label htmlFor='displayName'>Display Name: </label>
                        <input
                            className='border-4 focus:border-orange-400 focus:border-4 rounded-md p-2 w-52 bg-orange-200'
                            type='text'
                            id='displayName'
                            name='displayName'
                            placeholder='Enter a User Name'
                            value={userData.displayName || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-col md:flex-row md:space-x-5 align-middle justify-start items-center p-2'>
                        <label htmlFor='fullName'>Full Name: </label>
                        <input
                            className='border-4 focus:border-orange-400 focus:border-4 rounded-md p-2 w-52 bg-orange-200'
                            type='text'
                            id='fullName'
                            name='fullName'
                            placeholder='Enter Full Name'
                            value={userData.fullName || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <LocationInput
                        initialLocation={userData.location}
                        onSelectLocation={handleLocationSelect}
                    />
                </div>
                <div className='flex flex-col align-middle justify-start items-center p-2'>
                    <label htmlFor='interests'>interests</label>
                    <div className='flex flex-wrap justify-center items-start'>
                        {interestList.map((interest) => (
                            <div
                                key={interest.title}
                                className={`flex flex-col items-center basis-1/2 sm:basis-1/4 md:basis-1/6 mr-4 mb-4 text-center justify-center border-4 rounded-lg  w-40 h-14 p-2 m-2' ${
                                    userData.userInterests.includes(
                                        interest.title
                                    )
                                        ? "bg-orange-400"
                                        : "border-orange-400"
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
                <div className='flex justify-end absolute right-20'>
                    <button
                        type='submit'
                        className='flex justify-center bg-orange-400 w-32 text-white text-center p-2 my-2 rounded cursor-pointer hover:bg-orange-300 hover:font-semibold hover:text-black'
                    >
                        Update Profile
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
                    <div className='flex justify-center items-center'>
                        <p className='text-green-500 border-white bg-green-200 justify-center items-center w-fit rounded-lg slide-in'>
                            {successMessage}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default UserDetails;
