import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { BsTranslate } from "react-icons/bs";
import {
    VscAccount,
    VscChevronDown,
    VscChevronUp,
    VscChromeClose,
    VscMenu,
} from "react-icons/vsc";

import { auth } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const { user } = useUser();
    const { t } = useTranslation("common");
    const router = useRouter("/");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLangDropdown = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
        setIsAccountDropdownOpen(false);
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
        setIsLangDropdownOpen(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsLangDropdownOpen(false);
        setIsAccountDropdownOpen(false);
    };

    function handleSignOut(e) {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                //console.log("User Logged Out"); //tests
                router.push("/");
            })
            .catch((err) => {
                // console.log(err.message);
                err.message;
            });
    }

    return (
        <div className='sticky top-0 w-full layout text-white shadow-lg z-50'>
            <div className='mx-auto px-4 sm:px-8 md:px-0'>
                <div className='flex items-center justify-between p-4'>
                    <Link
                        href='/'
                        className='text-2xl font-bold cursor-pointer'
                        onClick={closeMenu}
                    >
                        Logo
                    </Link>
                    {/*SM view*/}
                    <div className='absolute right-0 p-5 sm:hidden'>
                        <VscMenu
                            className='text-2xl cursor-pointer'
                            onClick={toggleMenu}
                        />
                    </div>
                    <div className='hidden sm:flex space-x-4'>
                        <Link
                            href='/about'
                            className='cursor-pointer flex hover:bg-amber-200 hover:rounded-lg p-2'
                            onClick={closeMenu}
                        >
                            {t("About")}
                        </Link>
                        <Link
                            href='/events'
                            className=' fcursor-pointer flex hover:bg-amber-200 hover:rounded-lg p-2'
                            onClick={closeMenu}
                        >
                            {t("Events")}
                        </Link>
                        <div className='relative w-38'>
                            <span
                                className='cursor-pointer flex  hover:bg-amber-200 hover:rounded-lg p-2'
                                onClick={toggleLangDropdown}
                            >
                                <BsTranslate className='mr-5' />
                                {t("Language")}
                                {isLangDropdownOpen ? (
                                    <VscChevronUp />
                                ) : (
                                    <VscChevronDown />
                                )}
                            </span>
                            {isLangDropdownOpen && (
                                <div className='absolute top-full left-0 w-full p-2 layout border-4 border-grey-800 border-3 rounded-lg shadow-lg  mt-2'>
                                    <Link
                                        href=''
                                        locale='en'
                                        className='block text-sm text-white p-2 w-38 hover:bg-amber-200 rounded-xl'
                                    >
                                        English
                                    </Link>
                                    <Link
                                        href=''
                                        locale='ar'
                                        className='block text-sm text-white p-2 w-38 hover:bg-amber-200 rounded-xl'
                                    >
                                        العربية
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className='relative'>
                            <span
                                className='cursor-pointer flex hover:bg-amber-200 hover:rounded-lg p-2 items-center space-x-2'
                                onClick={toggleAccountDropdown}
                            >
                                <VscAccount className='mr-5' />
                                {user ? t("Account") : t("Join Us")}
                                {isAccountDropdownOpen ? (
                                    <VscChevronUp />
                                ) : (
                                    <VscChevronDown />
                                )}
                            </span>
                            {isAccountDropdownOpen && (
                                <div className='absolute top-full left-0 w-full p-2 layout border-4 border-grey-800 border-3 rounded-lg shadow-lg  mt-2'>
                                    {user ? (
                                        <>
                                            <Link
                                                href={`/profile/${user.uid}`}
                                                className='block text-sm text-white p-2  hover:bg-amber-200 rounded-xl'
                                                onClick={closeMenu}
                                            >
                                                {t("Your Profile")}
                                            </Link>
                                            <Link
                                                href='/events/yourEvents'
                                                className='block text-sm text-white p-2  hover:bg-amber-200 rounded-xl'
                                                onClick={closeMenu}
                                            >
                                                {t("Your Events")}
                                            </Link>
                                            <Link
                                                href='/'
                                                className='block text-sm text-white p-2  hover:bg-amber-200 rounded-xl'
                                                onClick={handleSignOut}
                                            >
                                                {t("Sign Out")}
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href='/authentication/signUp'
                                                className='block text-sm text-white p-2  hover:bg-amber-200 rounded-xl'
                                                onClick={closeMenu}
                                            >
                                                {t("Sign Up")}
                                            </Link>
                                            <Link
                                                href='/authentication/signIn'
                                                className='block text-sm text-white p-2  hover:bg-amber-200 rounded-xl'
                                                onClick={closeMenu}
                                            >
                                                {t("Sign In")}
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/*SM View */}
                    <div className='sm:hidden'>
                        {isMenuOpen && (
                            <div className='fixed top-0 left-0 w-screen h-auto layout text-white z-50'>
                                <div className='flex justify-between p-4'>
                                    <Link
                                        href='/'
                                        className='text-2xl font-bold cursor-pointer '
                                        onClick={closeMenu}
                                    >
                                        Logo
                                    </Link>
                                    <VscChromeClose
                                        className='text-2xl cursor-pointer'
                                        onClick={toggleMenu}
                                    />
                                </div>
                                <div className='text-center'>
                                    <Link
                                        href='/about'
                                        className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg border-t-2 border-amber-700'
                                        onClick={closeMenu}
                                    >
                                        {t("About")}
                                    </Link>
                                    <Link
                                        href='/events'
                                        className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg border-t-2 border-amber-700'
                                        onClick={closeMenu}
                                    >
                                        {t("Events")}
                                    </Link>

                                    <div className='w-full border-t-2 border-amber-700'>
                                        <button
                                            className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                            onClick={toggleLangDropdown}
                                        >
                                            <BsTranslate className='mr-5' />
                                            {t("Language")}{" "}
                                            {isLangDropdownOpen ? (
                                                <VscChevronUp />
                                            ) : (
                                                <VscChevronDown />
                                            )}
                                        </button>
                                        {isLangDropdownOpen && (
                                            <div className='w-full border-t-2 border-amber-700'>
                                                <Link
                                                    href=''
                                                    locale='en'
                                                    className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                                >
                                                    English
                                                </Link>

                                                <Link
                                                    href=''
                                                    locale='ar'
                                                    className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                                >
                                                    العربية{" "}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <div className='relative'>
                                        <div
                                            className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg border-t-2 border-amber-700'
                                            onClick={toggleAccountDropdown}
                                        >
                                            <VscAccount className='mr-4' />
                                            {user ? t("Account") : t("Join Us")}
                                            {isAccountDropdownOpen ? (
                                                <VscChevronUp />
                                            ) : (
                                                <VscChevronDown />
                                            )}
                                        </div>
                                        {isAccountDropdownOpen && (
                                            <div className='w-full border-t-2 border-amber-700'>
                                                {user ? (
                                                    <>
                                                        <Link
                                                            href={`/profile/${user.displayName}`}
                                                        >
                                                            <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                                {t(
                                                                    "Your Profile"
                                                                )}
                                                            </button>
                                                        </Link>
                                                        <Link href='/events'>
                                                            <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                                {t(
                                                                    "Your Events"
                                                                )}
                                                            </button>
                                                        </Link>
                                                        <button
                                                            href='/'
                                                            className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                                            onClick={
                                                                handleSignOut
                                                            }
                                                        >
                                                            {t("Sign Out")}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link href='/authentication/signIn'>
                                                            <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                                {t("Sign In")}
                                                            </button>
                                                        </Link>
                                                        <Link href='/authentication/signUp'>
                                                            <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                                {t("Sign Up")}
                                                            </button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
