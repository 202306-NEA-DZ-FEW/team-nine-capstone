import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { CgClose, CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaLanguageSolid } from "react-icons/lia";

const Navbar = () => {
    const [user, setUser] = useState(true); // Set to true if a user is authenticated, otherwise, set it to false
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [isHamburgerOn, setIsHamburgerOn] = useState(false);
    const { t, i18 } = useTranslation("common");
    const router = useRouter();

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        const currentLocale = router.locale;

        if (selectedLanguage !== currentLocale) {
            router.push(router.asPath, router.asPath, {
                locale: selectedLanguage,
            });
        }
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
        setLanguageDropdownOpen(false);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownOpen(!isLanguageDropdownOpen);
        setProfileDropdownOpen(false);
    };

    const toggleHamburger = () => {
        setIsHamburgerOn(!isHamburgerOn);
    };

    return (
        <nav className='layout sticky w-screen items-center flex justify-between p-2 '>
            <div className='p-1 font-bold'> Logo </div>

            {/* Mobile/Tablette view */}
            <div className='absolute right-1 lg:hidden p-2 flex-col justify-between hover:bg-amber-300 hover:text-white rounded-lg'>
                {isHamburgerOn ? (
                    <CgClose onClick={toggleHamburger} />
                ) : (
                    <GiHamburgerMenu onClick={toggleHamburger} />
                )}
                {isHamburgerOn && (
                    <div className='fixed top-12 left-0 w-full md:w-56 md:h-80 md:-left-48 md:top-14 rounded-lg md:absolute layout z-50'>
                        <div className='w-full items-center flex flex-col'>
                            <div className='w-full '>
                                <button
                                    className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                    onClick={toggleProfileDropdown}
                                >
                                    <CgProfile />{" "}
                                    {user ? t("Profile") : t("Sign Up")}
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className='w-full border-t-2 border-amber-700'>
                                        {user ? (
                                            <>
                                                <Link href='/profile'>
                                                    <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                        {t("Your Profile")}
                                                    </button>
                                                </Link>
                                                <Link href='/events'>
                                                    <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                        {t("Your Events")}
                                                    </button>
                                                </Link>
                                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                    {t("Sign Out")}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link href='../../pages/signIn/signIn'>
                                                    <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                        {t("Sign In")}
                                                    </button>
                                                </Link>
                                                <Link href='../../pages/signUp/signUp'>
                                                    <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                                        {t("Sign Up")}
                                                    </button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className='w-full border-t-4 border-amber-700'>
                                <button
                                    className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                    onClick={toggleLanguageDropdown}
                                >
                                    <LiaLanguageSolid /> {t("Language")}
                                </button>
                                {isLanguageDropdownOpen && (
                                    <div className='w-full border-t-2 border-amber-700'>
                                        <Link
                                            href='/'
                                            locale='en'
                                            className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                        >
                                            English
                                        </Link>

                                        <Link
                                            href='/'
                                            locale='ar'
                                            className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'
                                        >
                                            العربية
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className='w-full border-t-4 border-amber-700'>
                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                    <Link href='#'>{t("Events")}</Link>
                                </button>
                            </div>
                            <div className='w-full border-t-4 border-amber-700'>
                                <button className='w-full p-2 flex items-center justify-center hover:bg-amber-300 hover:text-white rounded-lg'>
                                    <Link href='#'>{t("About")}</Link>
                                </button>
                            </div>
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
                    >
                        <CgProfile /> {user ? t("Profile") : t("Sign Up")}
                    </button>
                    {isProfileDropdownOpen && (
                        <div className='absolute layout top-full mt-2 w-26 p-2 border border-gray-400 rounded-lg'>
                            {user ? (
                                <>
                                    <Link href='/profile' /*"/profile/[id]"*/>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            {t("Your Profile")}
                                        </div>
                                    </Link>
                                    <Link
                                        href='/events' /*"/profile/[id]/events"*/
                                    >
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            {t("Your Events")}
                                        </div>
                                    </Link>
                                    <button
                                        className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg' /*onClick={signOut}*/
                                    >
                                        {t("Sign Out")}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href='authentification/signin'>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            {t("Sign In")}
                                        </div>
                                    </Link>
                                    <Link href='/' /*"/signup"*/>
                                        <div className='block w-full text-left p-2  hover:bg-amber-300 hover:rounded-lg'>
                                            {t("Sign Up")}
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className='relative flex  hover:bg-amber-300 rounded-lg'>
                    {/* Language Dropdown */}
                    <div className='p-2 mx-2 flex items-center '>
                        <LiaLanguageSolid />
                    </div>
                    <select
                        className='p-1 flex items-center rounded-lg layout hover:bg-amber-300'
                        value={router.locale}
                        onChange={handleLanguageChange}
                    >
                        <option className='mx-2 p-2 ' value='en'>
                            English
                        </option>
                        <option value='ar'>العربية</option>
                    </select>
                </div>
                <button className='p-2 mx-2 hover:bg-amber-300 hover:text-white rounded-lg'>
                    {" "}
                    <Link href='#'>{t("Events")}</Link>
                </button>
                <button className='p-2 mx-2 hover:bg-amber-300 hover:text-white rounded-lg'>
                    {" "}
                    <Link href='#'>{t("About")}</Link>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
