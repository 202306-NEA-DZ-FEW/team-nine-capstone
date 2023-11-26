import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

import { useUser } from "@/context/UserContext";

const HowitWorks = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const howitworks = [
        {
            image: "/images/ManTop.png",
            id: 1,
            title: t("Register"),
            description: t(
                "Sign up and create your account to join our community."
            ),
            logo: t("Sign Up"),
            link: "/authentication/signUp",
        },
        {
            image: "/images/attend.png",
            id: 2,
            title: t("Attend events"),
            description: t(
                "Participate in inspiring events and make a difference in the community."
            ),
            logo: t("View events"),
            link: "/events",
        },
        {
            image: "/images/Girl.png",
            id: 3,
            title: t("Organize your own!"),
            description: t(
                "Host your own charity event and bring positive change to the world."
            ),
            logo: t("Get started"),
            link: user ? "/createTheEvent" : "/authentication/signUp",
        },
        {
            image: "/images/donation.png",
            id: 4,
            title: t("Contribute"),
            description: t("HowitWorks.donate"),
            logo: t("Donate"),
            link: "https://donate.stripe.com/test_eVa5m5dw83qhe7C289",
        },
    ];

    return (
        <>
            <div className='how-inAll1 bg-bgc-silver '>
                <div className='md:w-2/5 text-center bg-bgc-silver md:text-center p-3'>
                    <div className='home-text sm:w-[70%] h-[60%] sm:h-[50%] flex flex-col justify-center mx-auto items-center'>
                        <Image
                            src='/images/HeroLogo.png'
                            alt='Logo'
                            width={50}
                            height={50}
                        ></Image>
                    </div>

                    <h2 className='text-xl md:text-2xl font-Montserrat text-center lg:text-3xl text-txtc-DarkCharcoal font-semibold '>
                        {t("HeroSection.title")}
                    </h2>
                    <p className='text-sm md:text-base font-Lora lg:text-lg text-center text-txtc-DarkCharcoal mb-4'>
                        {t("HeroSection.introduction")}
                    </p>
                </div>
            </div>
            <div className='h-full w-full flex flex-col gap-y-4 py-10 lg:px-14'>
                <h2 className='text-txtc-DarkCharcoal font-Montserrat text-3xl text-center font-semibold mb-10'>
                    {t("HowitWorks.title")}
                </h2>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                    {howitworks.map((service) => (
                        <div
                            key={service.id}
                            className='flex flex-col items-center gap-y-3 bg-white rounded-md shadow-md hover:shadow-lg transition duration-200 hover:scale-100 p-4'
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={220}
                                height={220}
                                className='w-full object-contain h-full shadow-md'
                            />
                            <h4 className='text-txtc-DarkCharcoal font-Montserrat text-xl font-medium leading-8'>
                                {service.title}
                            </h4>
                            <p className='text-txtc-DarkCharcoal text-base font-Lora font-normal leading-6'>
                                {service.description}
                            </p>
                            <a
                                href={service.link}
                                className='flex items-center text-txtc-DarkCharcoal font-Roboto font-semibold hover:text-amber-400 text-base mb-4 hover:underline'
                            >
                                {service.logo}{" "}
                                <AiOutlineRight className='mt-1 transition duration-300 hover:scale-200' />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HowitWorks;
