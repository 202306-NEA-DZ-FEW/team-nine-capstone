import { updateProfile } from "firebase/auth";
import React, { useState } from "react";

import { updateUserDocument } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function UserDetails() {
    const { user } = useUser();
    const [userData, setUserData] = useState({
        displayName: "",
        fullName: "",
        location: "",
        avatar: "",
        interest: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserDocument(user.uid, userData)
            .then(() => {
                // Update display name in authentication
                updateProfile(user, { displayName: userData.displayName }).then(
                    () => {
                        console.log("Display name updated successfully!");
                    }
                );
                //console.log("User document updated successfully!");
                //console.log(userData);
            })
            .catch((error) => {
                error;
                // console.error("Error updating user document:", error);
            });
    };

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='displayName'>Display Name</label>
                    <input
                        className='border-4 focus:border-black'
                        type='text'
                        id='displayName'
                        name='displayName'
                        value={userData.displayName}
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
                        value={userData.fullName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input
                        className='border-4 focus:border-black'
                        type='text'
                        id='location'
                        name='location'
                        value={userData.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='avatar'>Avatar Image</label>
                    <input
                        className='border-4 focus:border-black'
                        type='text'
                        id='avatar'
                        name='avatar'
                        value={userData.avatar}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor='interest'>Interest</label>
                    <input
                        className='border-4 focus:border-black'
                        type='text'
                        id='interest'
                        name='interest'
                        value={userData.interest}
                        onChange={handleInputChange}
                    />
                </div>
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    );
}

export default UserDetails;
