import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

function Footer() {
    const [user, setUser] = useState(false);
    const { t, i18 } = useTranslation("common");
    return (
        <footer className='bottom-0 w-screen mt-20 mx-auto  text-center layout text-white'>
            <div className='px-6 py-8 md:py-14 xl:pt-20 xl:pb-12'>
                <h2 className='font-bold text-3xl xl:text-4xl leading-snug'>
                    {t("footer.hook")}
                </h2>
                <Link
                    className='mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500'
                    href='#'
                >
                    Get started
                </Link>
                <div className='mt-14 xl:mt-20'>
                    <nav className='flex flex-wrap justify-center text-lg font-medium'>
                        <div className='px-5 py-2'>
                            <Link href='/about'>{t("About")}</Link>
                        </div>
                        <div className='px-5 py-2'>
                            <Link href='/events'>{t("Events")}</Link>
                        </div>
                        <div className='px-5 py-2'>
                            <Link href='/authentication/signIn'>
                                {user ? t("Account") : t("Sign In")}
                            </Link>
                        </div>
                        <div className='px-5 py-2'>
                            <Link href='/authentication/signUp'>
                                {user ? t("Your Events") : t("Sign Up")}
                            </Link>
                        </div>
                    </nav>
                    <p className='mt-7 font-medium'>
                        © Re:Coded DZ NEA FEW 2023
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
