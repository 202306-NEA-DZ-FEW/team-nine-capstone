import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    //  sendEmailVerification
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

import {
    auth,
    createUserDocument,
    googleProvider,
    twitterProvider,
} from "@/lib/firebase/controller";

import TermsAndConditions from "@/components/reusableComponents/TermsAndConditions";

import { useUser } from "@/context/UserContext";
import Layout from "@/layout/Layout";

import background from "../../../../public/images/background.png";

export default function SignUp() {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { setUser } = useUser();
    const router = useRouter();
    const { t } = useTranslation("common");
    const [modal, setModal] = useState(false);

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
            setSuccessMessage(t("SignUp.succLog"));
            router.push(`/profile/${user.uid}/editProfile`);
        } catch (error) {
            setError(t("SignUp.failLog"));
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
                setSuccessMessage(t("SignUp.succLog"));
                router.push("/profile/editProfile");
            })
            .catch((error) => {
                setError(t("SignUp.failLog"));
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
                setSuccessMessage(t("SignUp.succLog"));
                router.push("/profile/editProfile");
            })
            .catch((error) => {
                setError(t("SignUp.failLog"));
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
                <title>{t("indxSignUp.title")}</title>

                <meta
                    name='description'
                    content={t("indxSignUp.description")}
                />
                <meta name='keywords' content={t("indxSignUp.keywords")} />
            </Head>
            <div className='relative flex justify-center items-center h-screen'>
                <Image src={background} alt='background' layout='fill' />
                <div className='flex flex-col justify-center items-center content-center bg-white bg-opacity-50 rounded-lg z-30 w-2/3 py-5 space-y-4'>
                    <form
                        onSubmit={handleSignUp}
                        className='flex flex-col space-y-2 w-full justify-center items-center content-center'
                    >
                        <input
                            className='px-4 py-2 sm:text-2xl border-2 rounded-lg bg-black opacity-50 w-3/4 sm:w-1/2 text-white'
                            placeholder={t("SignUp.EnterUserName")}
                            type='text'
                            id='displayName'
                            name='displayName' // Add a name attribute
                        />
                        <input
                            className='px-4 py-2 sm:text-2xl border-2 rounded-lg bg-black opacity-50 w-3/4 sm:w-1/2 text-white'
                            placeholder={t("SignUp.EnterYourEmail")}
                            name='email'
                            type='Email'
                        />
                        <input
                            className='px-4 py-2 sm:text-2xl border-2 rounded-lg bg-black opacity-50 w-3/4 sm:w-1/2 text-white'
                            placeholder={t("SignUp.EnterYourPassword")}
                            type='password'
                            name='password'
                            minLength='8'
                        />
                        <button
                            className='rounded-lg px-4 py-2 sm:text-2xl text-center bg-amber-500 hover:bg-green-500 focus:bg-green-700'
                            type='submit'
                        >
                            {t("SignUp.register")}
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
                    <div className='sm:text-2xl font-semibold'>
                        {t("SignUp.account1")}
                        <u className='hover:font-bold'>
                            {" "}
                            <Link href='./signIn'> {t("SignUp.account2")}</Link>
                        </u>
                    </div>
                    <span className='flex items-center w-4/5 mx-5'>
                        <div className='grow shrink basis-0 h-0.5 bg-stone-900' />
                        <h1 className='text-2xl font-bold mx-4'>
                            {t("SignUp.or")}
                        </h1>
                        <div className='grow shrink basis-0 h-0.5 bg-stone-900' />
                    </span>
                    <div className='flex flex-col space-y-4'>
                        <button
                            onClick={handleGoogleSignUp}
                            className='px-4 py-2 text-black bg-white border-trnasparent rounded-lg  hover:bg-sky-500 hover:text-white focus:outline-none focus:bg-sky-600'
                        >
                            <div className='flex flex-row'>
                                <FcGoogle size={24} className='mx-2' />{" "}
                                {t("SignUp.Google")}
                            </div>
                        </button>
                        <button
                            onClick={handleTwitterSignUp}
                            className='px-4 py-2 text-black bg-white border-trnasparent opacity-100 rounded-lg hover:bg-black hover:text-white focus:outline-none focus:bg-black'
                        >
                            <div className='flex flex-row'>
                                <FaSquareXTwitter size={24} className='mx-2' />{" "}
                                {t("SignUp.Twitter")}
                            </div>
                        </button>
                    </div>
                    <div className='sm:text-2xl font-semibold justify-center text-center'>
                        {t("SignUp.Terms&Cons1")}
                        <u
                            className='hover:font-bold cursor-pointer'
                            onClick={() => setModal(true)}
                        >
                            {" "}
                            {t("SignUp.Terms&Cons2")}
                        </u>
                        {modal && <TermsAndConditions closeModal={setModal} />}
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
