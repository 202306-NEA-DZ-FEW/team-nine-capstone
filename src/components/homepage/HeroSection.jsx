import Image from "next/legacy/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

import ScrollToBottom from "@/components/reusableComponents/ScrollToBottom";

const Hero = () => {
    const { t } = useTranslation();

    return (
        <div className='hero-All '>
            <div className='hero-inAll'>
                <video
                    className='bg-video '
                    src='/images/heroVideo.mp4'
                    typeof='video/mp4'
                    poster='/images/background.png'
                    autoPlay
                    loop
                    playsInline
                    muted
                ></video>

                <div className='bg-overlay'></div>

                <div className='home-text sm:w-[70%] h-[60%] sm:h-[50%] flex flex-col justify-center items-center'>
                    <Image
                        src='/images/HeroLogo.png'
                        alt='Logo'
                        width={70}
                        height={70}
                    ></Image>
                    <h2 className='hero-h1'>Empower, Engage, Volunteer</h2>
                    <p className='hero-p'>
                        Inspire positive change and create meaningful impact
                        through acts of kindness and giving. Join us in making a
                        difference.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4  '>
                        <Link
                            href='events'
                            className='home-btn home-btn w-full sm:w-40 md:w-48 h-12 sm:h-16'
                            style={{
                                backgroundColor: "rgb(251, 191, 36, 0.5)",
                            }}
                        >
                            {t("Get Started")}
                        </Link>
                        <Link
                            href='https://donate.stripe.com/test_eVa5m5dw83qhe7C289'
                            className='home-btn w-full sm:w-40 md:w-48 h-12 sm:h-16 '
                            style={{
                                backgroundColor: "rgb(21, 128, 61, 0.5)",
                            }}
                        >
                            {t("Donate")}
                        </Link>
                    </div>
                    <ScrollToBottom />
                </div>
            </div>
        </div>
    );
};

export default Hero;
