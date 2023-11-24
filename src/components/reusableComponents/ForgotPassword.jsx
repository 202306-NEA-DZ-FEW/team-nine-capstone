import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

import { auth } from "@/lib/firebase/controller";

function ForgotPassword() {
    const { t } = useTranslation();
    const router = useRouter();
    // console.log(router);

    function handleReset(e) {
        e.preventDefault();
        const emailValue = e.target.email.value;
        // console.log("looking for e", emailValue);

        sendPasswordResetEmail(auth, emailValue)
            .then((data) => {
                alert("Please, check your Email !");
                router.push("/authentication/signIn");
            })
            .catch((err) => {
                alert("error", err, "and error code", err.code);
            });
    }

    return (
        <div className=' bg-bgc-silver min-h-screen flex items-center justify-center'>
            <div className='container mx-auto'>
                <div className='flex flex-col lg:flex-row justify-center px-6'>
                    <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
                        <div
                            className='w-full h-auto bg-bgc-silver hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
                            style={{
                                backgroundImage:
                                    "url('https://www.jugendleiter-blog.de/wp-content/uploads/2015/09/pebbles-796943_1280-696x461.jpg')",
                            }}
                        ></div>

                        <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
                            <div className='px-8 mb-4 text-center'>
                                <h3 className='pt-4 mb-2 text-2xl'>
                                    {t("passwordRst.title")}
                                </h3>
                                <p className='mb-4 text-sm text-txtc-DarkCharcoal'>
                                    {t("passwordRst.intro")}
                                </p>
                            </div>
                            <form
                                className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
                                onSubmit={(e) => handleReset(e)}
                            >
                                <div className='mb-4'>
                                    <label
                                        className='block mb-2 text-sm font-bold text-txtc-DarkCharcoal'
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
                                        className='w-full px-4 py-2 font-bold text-txtc-Ivory layout rounded-full focus:outline-none focus:shadow-outline'
                                        type='submit'
                                    >
                                        {t("passwordRst.reset")}
                                    </button>
                                </div>
                                <hr className='mb-6 border-t' />
                            </form>
                            <div className='text-center'>
                                <Link
                                    className='inline-block text-sm text-blue text-txtc-LightGray align-baseline hover:text-txtc-DarkCharcoal'
                                    href='/authentication/signUp'
                                >
                                    {t("passwordRst.create")}
                                </Link>
                            </div>
                            <div className='text-center'>
                                <Link
                                    className='inline-block text-sm text-txtc-LightGray align-baseline hover:text-txtc-DarkCharcoal'
                                    href='/authentication/signIn'
                                >
                                    {t("passwordRst.remember")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
