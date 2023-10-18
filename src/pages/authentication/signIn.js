import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";

import { auth } from "@/lib/firebase/controller";

export default function SignInOut() {
    function handleSignIn(e) {
        e.preventDefault();

        let email = e.target[0].value;
        let password = e.target[1].value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(
                    "User Logged in ",
                    userCredential.user,
                    email,
                    password
                );
            })
            .catch((err) => {
                const errCode = err.code;
                const errMsg = err.message;
                console.log(`${errMsg} and code is : ${errCode}`);
            });
    }

    function handleSignOut(e) {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                console.log("User Logged Out");
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className='relative flex flex-col justify-center h-screen'>
            <div className='lg:flex lg:gap-x-4 justify-center items-center mx-4'>
                <div className='lg:max-w-xl w-full'>
                    <img
                        className='w-full h-full object-cover rounded-md'
                        src=''
                        alt='sign up image'
                    />
                </div>
                <div className='w-full bg-white rounded-md lg:max-w-xl'>
                    <h1 className='text-2xl font-semibold text-center text-gray-700'>
                        Login to an account
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
                                type='password'
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            />
                        </div>
                        <p className='text-xs text-gray-800 font-bold'>
                            Forget Your Password !
                        </p>
                        <div className='mt-6'>
                            <button className='w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600'>
                                Sign In
                            </button>
                            <button
                                className='w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600'
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    </form>

                    <p className='mt-2 text-xs text-center text-gray-700'>
                        {" "}
                        Become a member?{" "}
                        <Link
                            className='font-medium text-gray-600 hover:underline'
                            href='/signUp/signUp'
                        >
                            {" "}
                            Sign Up{" "}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
