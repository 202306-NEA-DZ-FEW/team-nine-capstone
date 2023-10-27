import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";

import { storage } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function AvatarInput({ avatar, onUpdateAvatar }) {
    const [file, setFile] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        const uploadFile = () => {
            if (!file) return;

            const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            onUpdateAvatar(downloadURL);
                            console.log(
                                "image update in database successfully"
                            );
                        }
                    );
                }
            );
        };

        uploadFile();
    }, [file, user]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <label htmlFor='avatar'>Avatar Image</label>
            {avatar ? (
                <img
                    src={avatar}
                    alt='Avatar'
                    className='rounded-full border-orange-400 border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                />
            ) : (
                <img
                    src='/images/defaultUser.png'
                    alt='Default Avatar'
                    className='rounded-full border-orange-400 border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40'
                />
            )}
            <input type='file' id='avatar' onChange={handleFileChange} />
        </div>
    );
}

export default AvatarInput;
