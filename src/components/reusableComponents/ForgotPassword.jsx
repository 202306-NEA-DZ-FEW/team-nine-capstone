import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import { auth } from "@/lib/firebase/controller";

function ForgotPassword() {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    function handleReset(e) {
        e.preventDefault();
        const emailValue = e.target.email.value;

        sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                setPopupMessage(
                    "Check your email for password reset instructions."
                );
                setShowPopup(true);
            })
            .catch((err) => {
                setPopupMessage("Error: " + err.message);
                setShowPopup(true);
            });
    }

    const closePopup = () => {
        setShowPopup(false);
        router.push("/authentication/signIn");
    };

    return (
        <div className='how-inAll'>
            <div className='flex flex-col lg:flex-row justify-around p-1 items-center'>
                <div className='w-full xl:w-3/4 lg:w-11/12 flex m-4 border-bgc-silver border-5 shadow-2xl'>
                    <div className='w-full h-auto bg-bgc-silver hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'>
                        <Image
                            src='/images/ManTop.png'
                            height={500}
                            width={500}
                            alt='reset'
                        />
                    </div>

                    <div className='w-full lg:w-1/2 bg-white p-2 rounded-lg lg:rounded-l-none'>
                        <div className='px-8 mb-4 text-center'>
                            <h3 className='pt-4 mb-2 text-2xl font-Montserrat'>
                                {t("passwordRst.title")}
                            </h3>
                            <p className='mb-4 text-sm text-txtc-DarkCharcoal font-Roboto'>
                                {t("passwordRst.intro")}
                            </p>
                        </div>
                        <form
                            className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
                            onSubmit={(e) => handleReset(e)}
                        >
                            <div className='mb-4'>
                                <label
                                    className='block mb-2 text-sm font-Montserrat font-bold text-txtc-DarkCharcoal'
                                    htmlFor='email'
                                >
                                    {t("passwordRst.email")}
                                </label>
                                <input
                                    className='w-full px-3 py-2 text-sm leading-tight text-txtc-DarkCharcoal border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='Enter Email Address...'
                                />
                            </div>
                            <div className='mb-6 text-center'>
                                <button
                                    className='w-full px-4 py-2 font-bold bg-bgc-sunflower font-Montserrat text-txtc-DarkCharcoal layout rounded-full focus:outline-none focus:shadow-outline'
                                    type='submit'
                                >
                                    {t("passwordRst.reset")}
                                </button>
                            </div>
                            <hr className='mb-6 border-t' />
                        </form>
                        <div className='text-center'>
                            <Link
                                className='inline-block font-OpenSans font-normal text-sm text-blue text-txtc-LightGray align-baseline hover:text-txtc-DarkCharcoal'
                                href='/authentication/signUp'
                            >
                                {t("passwordRst.create")}
                            </Link>
                        </div>
                        <div className='text-center'>
                            <Link
                                className='inline-block font-OpenSans font-normal text-sm text-txtc-LightGray align-baseline hover:text-txtc-DarkCharcoal'
                                href='/authentication/signIn'
                            >
                                {t("passwordRst.remember")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-bgc-Charcoal rounded-lg bg-opacity-75'>
                    <div className='bg-white p-4 rounded shadow-md'>
                        <p className='text-lg font-Roboto font-semibold mb-2'>
                            {t("passwordRst.popupMessage")}
                        </p>
                        <button
                            className='bg-bgc-sunflower font-Roboto text-txtc-DarkCharcoal px-3 py-1 rounded-full hover:bg-bgc-silver focus:outline-none'
                            onClick={closePopup}
                        >
                            {t("passwordRst.close")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
