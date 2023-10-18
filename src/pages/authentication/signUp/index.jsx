import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Layout from "@/layout/Layout";

import { auth } from "@/lib/firebase/controller";

export default function index() {
    function handleSignUp(e) {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        let newEmail = e.target[0].value;
        let newPassword = e.target[1].value;
        console.log(newEmail);
        console.log(newPassword);
        createUserWithEmailAndPassword(auth, newEmail, newPassword)
            .then((userCredential) => {
                console.log(userCredential.user, newEmail, newPassword);
            })
            .catch((err) => {
                const errCode = err.code;
                const errMsg = err.message;
                console.log(`${errMsg} and the err code is ${errCode} `);
            });
    }

    // const handleTwitterSignUp = () => {
    // };

    // const handleGoogleSignUp = () => {
    // };

    return (
        <Layout>
            <div className='relative flex flex-col justify-center h-screen'>
                <div className='lg:flex lg:gap-x-4 justify-center items-center mx-4'>
                    <div className='lg:max-w-xl w-full'>
                        {/* <Image
                        className='w-full h-full object-cover rounded-md'
                        src='/public/images/Square.png'
                        alt='sign up with image'
                        layout=
                        width={100}
                        height={75}
                    /> */}
                    </div>
                    <div className='w-full bg-white rounded-md lg:max-w-xl'>
                        <h1 className='text-2xl font-semibold text-center text-gray-700'>
                            Create an account
                        </h1>
                        <div className='mt-6'>
                            <button
                                // handleTwitterSignUp
                                className='w-full px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-600'
                            >
                                Sign up with Twitter
                            </button>

                            <button
                                // handleGoogleSignUp
                                className='w-full mt-4 px-4 py-2 text-white bg-red-400 rounded-lg hover:bg-red-500 focus:outline-none focus:bg-red-600'
                            >
                                Sign up with Google
                            </button>
                        </div>
                        <form className='mt-6' onSubmit={handleSignUp}>
                            {/* <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div> */}
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
