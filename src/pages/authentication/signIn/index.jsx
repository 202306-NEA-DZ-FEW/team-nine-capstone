import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { auth } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

import background from "../../../../public/images/background.png";

export default function SignUp() {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { setUser } = useUser();
    const router = useRouter();
    const { t } = useTranslation("common");

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
            setSuccessMessage(t("signIn.succLog"));
            router.push("/");
        } catch (error) {
            setError(t("signIn.failLog"));
        }
    }

    // Function to handle Google sign-in
    async function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            setSuccessMessage(t("signIn.succLog"));
            router.push("/");
        } catch (error) {
            setError(t("signIn.failLog"));
        }
    }

    // Function to handle Twitter sign-in
    async function handleTwitterSignIn() {
        const provider = new TwitterAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            setSuccessMessage(t("signIn.succLog"));
            router.push("/");
        } catch (error) {
            setError(t("signIn.failLog"));
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

    useEffect(() => {
        if (successMessage || error) {
            // After 5 seconds, remove the success message
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000);

            // Clear the timer if the component unmounts or if successMessage changes
            return () => clearTimeout(timer);
        }
    }, [successMessage, error]);

    return (
        <Layout>
            <Head>
                <title>{t("indxsignIn.title")}</title>

                <meta
                    name='description'
                    content={t("indxsignIn.description")}
                />
                <meta name='keywords' content={t("indxsignIn.keywords")} />
            </Head>
            <div className='relative flex justify-center items-center h-screen'>
                <Image src={background} alt='background' layout='fill' />
                <div className='flex flex-col justify-center items-center content-center bg-white bg-opacity-50 rounded-lg z-30 w-2/3 py-5 space-y-4'>
                    <form
                        onSubmit={handleSignIn}
                        className='flex flex-col space-y-2 w-full justify-center items-center content-center'
                    >
                        <input
                            className='px-4 py-2 sm:text-2xl border-2 rounded-lg bg-black opacity-50 w-3/4 sm:w-1/2 text-white'
                            placeholder={t("signIn.EnterYourEmail")}
                            name='email'
                            type='Email'
                        />
                        <input
                            className='px-4 py-2 sm:text-2xl border-2 rounded-lg bg-black opacity-50 w-3/4 sm:w-1/2 text-white'
                            placeholder={t("signIn.EnterYourPassword")}
                            type='password'
                            name='password'
                            minLength='8'
                        />
                        <p className='sm:text-2xl font-semibold'>
                            {t("signIn.PassReset1")}
                            <u className='hover:font-bold'>
                                <Link href='./forgotPassword'>
                                    {t("signIn.PassReset2")}
                                </Link>
                            </u>
                        </p>
                        <button
                            className='rounded-lg sm:text-2xl px-4 py-2 text-center bg-amber-400 hover:bg-green-500 focus:bg-green-700'
                            type='submit'
                        >
                            {t("signIn.button")}
                        </button>
                    </form>
                    {error && (
                        <div className='flex justify-center items-center'>
                            <p className='px-4 py-2 text-red-500 border-white w-fit bg-red-300 justify-center items-center rounded-lg slide-in'>
                                {error}
                            </p>
                        </div>
                    )}
                    {successMessage && (
                        <div className='flex justify-center items-center'>
                            <p className='px-4 py-2 text-green-700 border-white bg-green-200 justify-center items-center w-fit rounded-lg slide-in'>
                                {successMessage}
                            </p>
                        </div>
                    )}
                    <div className='sm:text-2xl font-semibold justify-center items-center'>
                        {t("signIn.noAccount")}
                        <u className='hover:font-bold'>
                            {" "}
                            <Link href='./signUp'>
                                {" "}
                                {t("signIn.noAccount2")}{" "}
                            </Link>
                        </u>
                    </div>
                    <span className='flex justify-center items-center w-4/5 mx-5 text-2xl'>
                        <div className='grow shrink basis-0 h-0.5 bg-stone-900' />
                        <h1 className='font-bold mx-4'>{t("signIn.or")}</h1>
                        <div className='grow shrink basis-0 h-0.5 bg-stone-900' />
                    </span>
                    <div className='flex flex-col space-y-4'>
                        <button
                            onClick={handleGoogleSignIn}
                            className='px-4 py-2 text-black bg-white border-trnasparent rounded-lg hover:bg-black hover:text-white focus:outline-none focus:bg-black'
                        >
                            <div className='flex flex-row sm:text-xl'>
                                <FcGoogle size={24} className='mx-2' />{" "}
                                {t("signIn.Google")}
                            </div>
                        </button>
                        <button
                            onClick={handleTwitterSignIn}
                            className='px-4 py-2 text-black bg-white border-trnasparent opacity-100 rounded-lg hover:bg-sky-500 focus:outline-none focus:bg-sky-600'
                        >
                            <div className='flex flex-row sm:text-xl'>
                                <FaSquareXTwitter size={24} className='mx-2' />{" "}
                                {t("signIn.Twitter")}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
