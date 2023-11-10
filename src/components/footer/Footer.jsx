import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

function Footer() {
    const auth = getAuth();
    const user = auth.currentUser;

    const { t } = useTranslation("common");
    return (
        <footer className='bottom-0 w-screen mx-auto  text-center bg-gray-800 text-white backdrop:blur-2xl'>
            <div className='px-6  md:py-14 xl:pt-10 xl:pb-10 py-6'>
                <h2 className='font-semibold text-3xl xl:text-3xl leading-snug'>
                    {t("footer.hook")}
                </h2>
                <div className='mt-10 xl:mt-10'>
                    <nav className='flex flex-wrap justify-center text-lg font-medium'>
                        <div className='px-5 py-2'>
                            <Link href='/about'>{t("About")}</Link>
                        </div>
                        <div className='px-5 py-2'>
                            <Link href='/termsAndConditions'>
                                {t("Terms of Use")}
                            </Link>
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
                    <hr className='text-black' />
                    <p className='mt-7 font-medium'>
                        © Re:Coded DZ NEA FEW 2023
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
