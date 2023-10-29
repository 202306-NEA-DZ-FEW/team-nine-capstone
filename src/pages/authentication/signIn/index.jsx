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

        let email = e.target[0].value;
        let password = e.target[1].value;
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Update the user context with the signed-in user

            console.log("User Logged in ", user, email, password); //for testing
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
