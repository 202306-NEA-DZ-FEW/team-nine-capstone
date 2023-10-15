import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const HowitWorks = () => {
    const howitworks = [
        {
            image: "/images/ManTop.png",
            id: 1,
            title: "Register",
            description: "Lorem ipsum",
            link: "Sign up",
        },
        {
            image: "/images/attend.png",
            id: 2,
            title: "Attend events",
            description: "Lorem ipsum",
            link: "View events",
        },
        {
            image: "/images/Girl.png",
            id: 3,
            title: "Organize your own!",
            description: "Lorem ipsum",
            link: "Get started",
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
                        <img
                            src={service.image}
                            alt={service.title}
                            className='w-50 h-56 object-cover'
                        />
                        <h4 className='text-zinc-900 text-2xl font-medium leading-10 tracking-tight'>
                            {service.title}
                        </h4>
                        <p className='text-zinc-500 text-xl font-normal leading-8 tracking-tight'>
                            {service.description}
                        </p>
                        <a
                            href={service.link}
                            className="flex items-center text-zinc-900 text-[18px] font-medium font-['Rubik']"
                        >
                            {service.link} <AiOutlineRight className='ml-2' />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowitWorks;
