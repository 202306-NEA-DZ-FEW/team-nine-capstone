import Image from "next/legacy/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

import ExternalLink from "@/components/reusableComponents/ExternalLink";
import ScrollToBottom from "@/components/reusableComponents/ScrollToBottom";

import { useUser } from "@/context/UserContext";

const Hero = () => {
    const { t } = useTranslation();
    const { user } = useUser();

    return (
        <div className='hero-All '>
            <div className='hero-inAll'>
                <video
                    className='bg-video w-full h-full object-cover'
                    src='/images/check.mp4'
                    type='video/mp4'
                    poster='/images/background.png'
                    autoPlay
                    loop
                    playsInline
                    muted
                ></video>

                <div className='bg-overlay'></div>

                <div className='home-text flex flex-col justify-center items-center'>
                    <Image
                        src='/images/HeroLogo.png'
                        alt='Logo'
                        width={65}
                        height={65}
                        className='hidden'
                    ></Image>
                    <h2 className='hero-h1'>{t("VideoSection.title")}</h2>
                    <p className='hero-p'>{t("VideoSection.intro")}</p>

                    <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4  '>
                        <Link
                            href={user ? "/events" : "/authentication/signUp"}
                            className='home-btn home-btn w-full sm:w-40 md:w-48 h-12 sm:h-16'
                            style={{
                                backgroundColor: "rgb(251, 191, 36, 0.5)",
                            }}
                        >
                            {t("VideoSection.start")}
                        </Link>

                        <ExternalLink href='https://donate.stripe.com/test_eVa5m5dw83qhe7C289'>
                            {t("VideoSection.donate")}
                        </ExternalLink>
                    </div>
                    <ScrollToBottom />
                </div>
            </div>
        </div>
    );
};

export default Hero;
