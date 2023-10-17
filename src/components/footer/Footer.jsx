import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

function Footer() {
    const [user, setUser] = useState(false);
    const { t } = useTranslation("common");

    return (
        <footer className='w-screen fixed bottom-0 layout flex justify-center'>
            <div className='flex flex-col items-center justify-center content-center mb-14 md:flex-row md:space-x-10'>
                <div className='p-4 md:absolute md:left-0'>Logo</div>
                <div className='p-4 justify-items-center items-center aligne-center content-center align-middle md:flex md:flex-row'>
                    <div className='items-center justify-center text-center content-center p-2'>
                        {" "}
                        <Link
                            className='items-center justify-center content-center p-2'
                            href='/about'
                        >
                            {t("About")}
                        </Link>
                    </div>
                    <div className='items-center justify-center text-center content-center p-2'>
                        <Link
                            className='items-center justify-center content-center p-2'
                            href='/events'
                        >
                            {t("Events")}
                        </Link>
                    </div>
                    <div className='items-center justify-center content-center text-center p-2'>
                        {user ? (
                            <Link
                                className='items-center justify-center content-center p-2'
                                href='/your-profile'
                            >
                                {t("Your Profile")}
                            </Link>
                        ) : (
                            <Link
                                className='items-center justify-center content-center p-2'
                                href='/sign-up'
                            >
                                {t("Sign Up")}
                            </Link>
                        )}
                    </div>
                    <div className='items-center justify-center content-center text-center p-2'>
                        {user ? (
                            <Link href='/your-events'>{t("Your Events")}</Link>
                        ) : (
                            <Link href='/sign-in'>{t("Sign In")}</Link>
                        )}
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 w-screen items-center justify-center content-center text-center bg-black text-white mt-8 p-4'>
                Re:Codede | DZ NEA FEW 2023
            </div>
        </footer>
    );
}

export default Footer;
