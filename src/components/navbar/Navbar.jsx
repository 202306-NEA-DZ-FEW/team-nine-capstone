import Link from "next/link";
import React, { useState } from "react";
import { CgClose, CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaLanguageSolid } from "react-icons/lia";

const Navbar = () => {
    const [user, setUser] = useState(true); // Set to true if a user is authenticated, otherwise, set it to false
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [isHamburgerOn, setIsHamburgerOn] = useState(false);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
        setLanguageDropdownOpen(false);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownOpen(!isLanguageDropdownOpen);
        setProfileDropdownOpen(false);
    };

    const closeDropdowns = () => {
        setProfileDropdownOpen(false);
        setLanguageDropdownOpen(false);
    };

    const toggleHamburger = () => {
        setIsHamburgerOn(!isHamburgerOn);
    };

    return (
        <nav className='layout sticky w-screen items-center flex justify-between p-2'>
            <div className='p-1 font-bold'> Logo </div>

            {/* Mobile view */}
            <div className='absolute right-1 lg:hidden p-2 flex-col justify-between hover:bg-amber-300 hover:text-white rounded-lg'>
                {isHamburgerOn ? (
                    <CgClose onClick={toggleHamburger} />
                ) : (
                    <GiHamburgerMenu onClick={toggleHamburger} />
                )}
                {isHamburgerOn && (
                    <div className='fixed top-12 left-0 w-full layout z-50'>
                        <div className='w-full items-center flex flex-col'>
                            <button
                                className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                onClick={toggleProfileDropdown}
                            >
                                <CgProfile /> {user ? "Profile" : "SignUp"}
                            </button>
                            {isProfileDropdownOpen && (
                                <div className='w-full'>
                                    {user ? (
                                        <>
                                            <Link href='/profile'>
                                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                    Your Profile
                                                </button>
                                            </Link>
                                            <Link href='/events'>
                                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                    Your Events
                                                </button>
                                            </Link>
                                            <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href='/signin'>
                                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                    Sign In
                                                </button>
                                            </Link>
                                            <Link href='/signup'>
                                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                    Sign Up
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                            <button
                                className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                onClick={toggleLanguageDropdown}
                            >
                                <LiaLanguageSolid /> Language
                            </button>
                            {isLanguageDropdownOpen && (
                                <div className='w-full'>
                                    <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                        English
                                    </button>
                                    <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                        العربية
                                    </button>
                                </div>
                            )}
                            <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                <Link href='#'>About</Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop view */}
            <div className='hidden lg:flex flex-row-reverse text-center '>
                <div className='relative'>
                    {/* Profile Dropdown */}
                    <button
                        className='p-2 mx-2 flex items-center hover:bg-amber-300 hover:text-white rounded-lg'
                        onClick={toggleProfileDropdown}
                        onBlur={closeDropdowns}
                    >
                        <CgProfile /> {user ? "Profile" : "Sign Up"}
                    </button>
                    {isProfileDropdownOpen && (
                        <div className='absolute layout top-full mt-2 w-26 p-2 border border-gray-400 rounded-lg'>
                            {user ? (
                                <>
                                    <Link href='/' /*"/profile"*/>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            Your Profile
                                        </div>
                                    </Link>
                                    <Link href='/' /*"/events"*/>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            Your Events
                                        </div>
                                    </Link>
                                    <button
                                        className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg' /*onClick={signOut}*/
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href='/' /*"/signin"*/>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            Sign In
                                        </div>
                                    </Link>
                                    <Link href='/' /*"/signup"*/>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            Sign Up
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className='relative'>
                    {/* Language Dropdown */}
                    <button
                        className='p-2 mx-2 flex items-center hover:bg-amber-300 hover:text-white rounded-lg'
                        onClick={toggleLanguageDropdown}
                        onBlur={closeDropdowns}
                    >
                        <LiaLanguageSolid /> Language
                    </button>
                    {isLanguageDropdownOpen && (
                        <div className='absolute top-full layout left-1 mt-2 w-32 p-2 border border-gray-400 rounded-lg'>
                            <ul>
                                <li className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                    English
                                </li>
                                <li className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                    العربية
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <button className='p-2 mx-2 hover:bg-amber-300 hover:text-white rounded-lg'>
                    {" "}
                    <Link href='#'>About</Link>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
