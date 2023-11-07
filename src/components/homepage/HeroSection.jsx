import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

const Hero = () => {
    const { t } = useTranslation();

    return (
        <div className='hero-inAll'>
            <video
                className='bg-video'
                src='/images/heroVideo.mp4'
                typeof='video/mp4'
                autoPlay
                loop
                playsInline
                muted
            ></video>

            <div className='bg-overlay'></div>

            <div className='home-text'>
                <Image
                    src='/images/tempLogo.svg'
                    alt=''
                    width={200}
                    height={200}
                ></Image>
                <h2 className='hero-h1' style={{ fontWeight: "bold" }}>
                    Living Through Giving
                </h2>
                <p className='hero-p' style={{ fontWeight: "lighter" }}>
                    Empowering individuals with the means to orchestrate and
                    experience the profound impact of acts of love
                </p>

                <div className='flex flex-row  '>
                    <Link
                        href='#'
                        className='home-btn'
                        style={{
                            backgroundColor: "rgb(251, 191, 36, 0.5)",
                        }}
                    >
                        {t("Get Started")}
                    </Link>
                    <Link
                        href='https://donate.stripe.com/test_eVa5m5dw83qhe7C289'
                        className='home-btn'
                        style={{
                            backgroundColor: "rgb(21, 128, 61, 0.5)",
                        }}
                    >
                        {t("Donate")}
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Hero;
