import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { storage } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function AvatarInput({ avatar, onUpdateAvatar }) {
    const { t } = useTranslation("common");
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
        <div className='flex flex-col md:space-y-10 space-x-0 align-middle justify-center items-center mt-14 '>
            {avatar ? (
                <Image
                    src={avatar}
                    alt='Avatar'
                    className='rounded-full w-30 h-30 md:w-2/4 md:h-2/4 '
                    width={120}
                    height={120}
                />
            ) : (
                <Image
                    src='/images/defaultUser.png'
                    alt='Default Avatar'
                    className='rounded-full  w-30 h-30 md:w-2/4 md:h-2/4 '
                    width={120}
                    height={120}
                />
            )}
            <input
                type='file'
                id='avatar'
                style={{ display: "none" }} // Hide the default file input
                onChange={handleFileChange}
            />
            <label
                htmlFor='avatar'
                className='bg-amber-400 w-32 text-white text-center p-2 mb-2 mt-10 rounded cursor-pointer hover:font-semibold hover:text-black'
            >
                {t("editProfile.ChangeAvatar")}
            </label>
        </div>
    );
}

export default AvatarInput;
