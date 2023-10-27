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
            })
            .catch((error) => {
                error;
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

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit}>
                <AvatarInput
                    avatar={userData.avatar}
                    onUpdateAvatar={updateAvatarUrl}
                />
                <div>
                    <label htmlFor='displayName'>Display Name</label>
                    <input
                        className='border-4 focus:border-black'
                        type='text'
                        id='displayName'
                        name='displayName'
                        placeholder='Enter a User Name'
                        value={userData.displayName || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        className='border-4 focus:border-black'
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
                <div>
                    <label htmlFor='interests'>interests</label>
                    <div className='flex flex-wrap justify-center items-start'>
                        {interestList.map((interest) => (
                            <div
                                key={interest.title}
                                className={`flex flex-col items-center basis-1/2 sm:basis-1/4 md:basis-1/6 mr-4 mb-4 p-4 border-2 border-gray-300 cursor-pointer ${
                                    userData.userInterests.includes(
                                        interest.title
                                    )
                                        ? "bg-orange-500"
                                        : ""
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
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    );
}

export default UserDetails;
