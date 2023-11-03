import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    //  sendEmailVerification
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import {
    auth,
    createUserDocument,
    googleProvider,
    twitterProvider,
} from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

export default function SignUp() {
    const { setUser } = useUser();
    const router = useRouter();

    async function handleSignUp(e) {
        e.preventDefault();

        let newDisplayName = e.target.displayName.value;
        let newEmail = e.target.email.value;
        let newPassword = e.target.password.value;

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                newEmail,
                newPassword
            );

            await updateProfile(user, {
                displayName: newDisplayName,
            });

            const userData = {
                displayName: newDisplayName,
                email: newEmail,
                password: newPassword,
                iEvents: [],
            };

            await createUserDocument(user.uid, userData);

            //Verification email
            // await sendEmailVerification(user);
            // console.log("Verification email sent successfully!");

            setUser(user);

            router.push(`/profile/${user.uid}/editProfile`);
        } catch (err) {
            const errCode = err.code;
            const errMsg = err.message;
            console.log(`${errMsg} and the err code is ${errCode}`);
        }
    }

    function handleGoogleSignUp() {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;

                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    iEvents: [],
                };

                createUserDocument(user.uid, userData);
                setUser(user);

                router.push("/profile/editProfile");
            })
            .catch((err) => {
                const errCode = err.code;
                const errMsg = err.message;
                console.error(`${errMsg} and the error code is ${errCode}`);
            });
    }

    function handleTwitterSignUp() {
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                const user = result.user;

                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    iEvents: [],
                };

                createUserDocument(user.uid, userData);
                setUser(user);

                router.push("/profile/editProfile");
            })
            .catch((err) => {
                const errCode = err.code;
                const errMsg = err.message;
                console.error(`${errMsg} and the error code is ${errCode}`);
            });
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
                    <div className='lg:max-w-xl w-full'></div>
                    <div className='w-full bg-white rounded-md lg:max-w-xl'>
                        <h1 className='text-2xl font-semibold text-center text-gray-700'>
                            Create an account
                        </h1>
                        <div className='mt-6'>
                            <button
                                onClick={handleTwitterSignUp}
                                className='w-full mt-4 px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-600'
                            >
                                Sign up with Twitter
                            </button>

                            <button
                                onClick={handleGoogleSignUp}
                                className='w-full mt-4 px-4 py-2 text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:bg-red-600'
                            >
                                Sign up with Google
                            </button>
                        </div>
                        <form className='mt-6' onSubmit={handleSignUp}>
                            <div className='mb-2'>
                                <label
                                    htmlFor='displayName'
                                    className='block text-sm font-semibold text-gray-800'
                                >
                                    User Name
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type='text'
                                    id='displayName'
                                    name='displayName' // Add a name attribute
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                    placeholder='add your name here'
                                    required
                                />
                            </div>

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
                            <p className='text-xs text-gray-800 font-bold'>
                                Password must be at least 8 characters long
                            </p>
                            <div className='mt-6'>
                                <button className='w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600'>
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className='mt-2 text-xs text-center text-gray-700'>
                            {" "}
                            Already a member?{" "}
                            <Link
                                className='font-medium text-gray-600 hover:underline'
                                href='./signIn'
                            >
                                {" "}
                                Sign in{" "}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
