import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { auth } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

export default function SignUp() {
    const { setUser } = useUser();
    const router = useRouter();

    async function handleSignIn(e) {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Update the user context with the signed-in user

            // console.log("User Logged in ", user, email, password); //for testing
            router.push("/");
        } catch (err) {
            const errCode = err.code;
            const errMsg = err.message;
            console.log(`${errMsg} and code is : ${errCode}`);
        }
    }
    useEffect(() => {
        const Logged = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        }, []);
        return () => {
            Logged();
        };
    }, [setUser]);

    return (
        <Layout>
            <div className='relative flex flex-col justify-center h-screen'>
                <div className='lg:flex lg:gap-x-4 justify-center items-center mx-4'>
                    <div className='lg:max-w-xl w-full'>
                        {/* <img
                            className='w-full h-full object-cover rounded-md'
                            src=''
                            alt='sign up image'
                        /> */}
                    </div>
                    <div className='w-full bg-white rounded-md lg:max-w-xl'>
                        <h1 className='text-xl mt-4 px-4 py-2 font-semibold text-center text-gray-700'>
                            Login with:
                        </h1>
                        {/* // the following will be used only to login users that originally signed up with one of the providers */}
                        <div className='mt-6'>
                            <button
                                // onClick={handleTwitterSignIn}
                                className='w-full mt-4 px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-600'
                            >
                                Twitter
                            </button>

                            <button
                                // onClick={handleGoogleSignIn}
                                className='w-full mt-4 px-4 py-2 text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:bg-red-600'
                            >
                                Google
                            </button>
                        </div>
                        <h1 className='text-xl mt-4 px-4 py-2 font-semibold text-center text-gray-700'>
                            or with:
                        </h1>
                        <form className='mt-6' onSubmit={handleSignIn}>
                            <div className='mb-2'>
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-semibold text-gray-800'
                                >
                                    Email
                                </label>
                                <input
                                    name='email'
                                    type='email'
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                />
                            </div>
                            <div className='mb-2'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-semibold text-gray-800'
                                >
                                    Password
                                </label>
                                <input
                                    name='password'
                                    type='password'
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                />
                            </div>
                            <Link
                                href='./forgotPassword'
                                className='text-xs text-gray-800 font-bold'
                            >
                                Forget Your <u> Password ! </u>
                            </Link>
                            <div className='mt-6'>
                                <button className='w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600'>
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <p className='mt-2 text-xs text-center text-gray-700'>
                            {" "}
                            Become a member?{" "}
                            <Link
                                className='font-medium text-gray-600 hover:underline'
                                href='./signUp'
                            >
                                {" "}
                                Sign Up{" "}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
