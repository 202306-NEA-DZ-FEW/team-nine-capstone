import Image from "next/image";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const HowitWorks = () => {
    const howitworks = [
        {
            image: "/images/ManTop.png",
            id: 1,
            title: "Register",
            description: "Lorem ipsum",
            logo: "Sign up",
            link: "/authentication/signUp",
        },
        {
            image: "/images/attend.png",
            id: 2,
            title: "Attend events",
            description: "Lorem ipsum",
            logo: "View events",
            link: "/events",
        },
        {
            image: "/images/Girl.png",
            id: 3,
            title: "Organize your own!",
            description: "Lorem ipsum",
            logo: "Get started",
            link: "/createEvent",
        },
    ];

    return (
        <div className='mt-20 mx-auto text-center max-w-[1440px] px-6'>
            <h2 className='text-zinc-900 text-4xl font-medium mb-20'>
                How it Works
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mb-10'>
                {howitworks.map((service) => (
                    <div
                        key={service.id}
                        className='flex flex-col items-center gap-6'
                    >
                        <Image
                            src={service.image}
                            alt={service.title}
                            width={220}
                            height={220}
                            className='w-[220px] h-[220]'
                        />
                        <h4 className='text-zinc-900 text-2xl font-medium leading-10 tracking-tight'>
                            {service.title}
                        </h4>
                        <p className='text-zinc-500 text-xl font-normal leading-8 tracking-tight'>
                            {service.description}
                        </p>
                        <a
                            href={service.link}
                            className="flex items-center text-zinc-900 text-xl font-medium font-['Rubik']"
                        >
                            {service.logo} <AiOutlineRight className='ml-2' />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowitWorks;
