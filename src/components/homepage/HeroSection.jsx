import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

const Hero = () => {
    const { t } = useTranslation();

    return (
        <div className='flex justify-center bg-gray-100 py-10 px-2 md:p-10 lg:p-10 mt-8 md:mt-10'>
            <div className='container max-w-6xl border shadow-lg rounded-lg bg-white p-6 md:p-10'>
                <div className='max-w-screen-2xl mx-auto flex flex-row md:flex-row items-center'>
                    <div className='mb-6 md:w-1/2 sm:w-2/3 md:mb-0'>
                        <Image
                            src='/images/square.png'
                            alt=''
                            width={400}
                            height={400}
                            className='w-[500px]'
                        />
                    </div>
                    <div className='md:w-2/5 text-center md:text-left pl-10'>
                        <h2 className='text-xl md:text-2xl lg:text-3xl text-zinc-900 font-semibold mb-4'>
                            {t("HeroSection.title")}
                        </h2>
                        <p className='text-sm md:text-base lg:text-lg text-zinc-500 mb-4'>
                            {t("HeroSection.introduction")}
                        </p>
                        <Link
                            href='#'
                            className='inline-block px-6 py-3 text-base md:text-xl font-semibold bg-green-700 rounded-lg text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100'
                        >
                            {t("Get Started")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hero;
