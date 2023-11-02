import Image from "next/image";
import { useTranslation } from "next-i18next";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const HowitWorks = () => {
    const { t } = useTranslation();

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
            link: "/createEvent",
        },
    ];

    return (
        <div className='lg:px-32 max-w-screen-2xl mx-auto  text-center px-8 bg-gray-100'>
            <h2 className='text-zinc-900 text-3xl font-semibold mb-10'>
                {t("HowitWorks.title")}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {howitworks.map((service) => (
                    <div
                        key={service.id}
                        className='flex flex-col items-center gap-y-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition duration-200 hover:scale-100'
                    >
                        <Image
                            src={service.image}
                            alt={service.title}
                            width={220}
                            height={220}
                            className='w-[140px] h-[130px] '
                        />
                        <h4 className='text-zinc-900 text-2xl font-medium leading-8'>
                            {service.title}
                        </h4>
                        <p className='text-zinc-500 text-lg font-normal leading-6'>
                            {service.description}
                        </p>
                        <a
                            href={service.link}
                            className='flex items-center text-zinc-900 font-semibold hover:text-amber-400 text-lg mb-4'
                        >
                            {service.logo}{" "}
                            <AiOutlineRight className=' mt-1 transition duration-300 hover:scale-200' />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowitWorks;
