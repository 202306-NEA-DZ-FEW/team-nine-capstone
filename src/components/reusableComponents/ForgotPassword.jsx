import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { auth } from "@/lib/firebase/controller";

function ForgotPassword() {
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
        <div className=' bg-gray-400 min-h-screen flex items-center justify-center'>
            <div className='container mx-auto'>
                <div className='flex flex-col lg:flex-row justify-center px-6'>
                    <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
                        <div
                            className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
                            style={{
                                backgroundImage:
                                    "url('https://www.jugendleiter-blog.de/wp-content/uploads/2015/09/pebbles-796943_1280-696x461.jpg')",
                            }}
                        ></div>

                        <div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
                            <div className='px-8 mb-4 text-center'>
                                <h3 className='pt-4 mb-2 text-2xl'>
                                    Forgot Your Password?
                                </h3>
                                <p className='mb-4 text-sm text-gray-700'>
                                    We get it, stuff happens. Just enter your
                                    email address below and we&apos;ll send you
                                    a link to reset your password!
                                </p>
                            </div>
                            <form
                                className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
                                onSubmit={(e) => handleReset(e)}
                            >
                                <div className='mb-4'>
                                    <label
                                        className='block mb-2 text-sm font-bold text-gray-700'
                                        htmlFor='email'
                                    >
                                        Email
                                    </label>
                                    <input
                                        className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='Enter Email Address...'
                                    />
                                </div>
                                <div className='mb-6 text-center'>
                                    <button
                                        className='w-full px-4 py-2 font-bold text-white layout rounded-full focus:outline-none focus:shadow-outline'
                                        type='submit'
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <hr className='mb-6 border-t' />
                            </form>
                            <div className='text-center'>
                                <Link
                                    className='inline-block text-sm text-blue text-slate-600 align-baseline hover:text-blue-800'
                                    href='/authentication/signUp'
                                >
                                    Create an Account!
                                </Link>
                            </div>
                            <div className='text-center'>
                                <Link
                                    className='inline-block text-sm text-slate-600 align-baseline hover:text-blue-800'
                                    href='/authentication/signIn'
                                >
                                    Remember you Password? Login!
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
