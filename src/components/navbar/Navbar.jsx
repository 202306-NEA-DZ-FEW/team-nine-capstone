import Link from "next/link";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LiaLanguageSolid } from "react-icons/lia";

const Navbar = () => {
    const [user, setUser] = useState(true); // Set to true if a user is authenticated, otherwise, set it to false
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const closeDropdowns = () => {
        if (isProfileDropdownOpen) setProfileDropdownOpen(false);
        if (isLanguageDropdownOpen) setLanguageDropdownOpen(false);
    };

    return (
        <nav className='w-screen sticky top-0 layout p-4 text-white'>
            <div className='flex justify-between items-center'>
                <div>
                    <Link href='/'>
                        <div className='text-xl font-bold'>LOGO</div>
                    </Link>
                </div>
                <div className='flex items-center space-x-4'>
                    <button
                        className='relative hover:bg-white hover:text-black rounded-full p-2'
                        onClick={toggleLanguageDropdown}
                        onBlur={closeDropdowns}
                    >
                        <LiaLanguageSolid className='text-2xl' />
                        {isLanguageDropdownOpen && (
                            <div className='absolute top-10 right-0 mt-2 layout w-32 p-2'>
                                <button className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                    English
                                </button>
                                <button className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                    العربية
                                </button>
                            </div>
                        )}
                    </button>
                    <button
                        className='relative hover:bg-white hover:text-black rounded-full p-2'
                        onClick={toggleProfileDropdown}
                        onBlur={closeDropdowns}
                    >
                        <CgProfile className='text-2xl' />
                        {isProfileDropdownOpen && (
                            <div className='absolute top-10 right-0 mt-2 layout w-32 p-2'>
                                {user ? (
                                    <>
                                        {/* first case if the profile is clicked and there's a user */}
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
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
