import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

const slideImages = [
    {
        url: "/images/AboutUs/Hero.jpg",
    },
    {
        url: "/images/AboutUs/Image.png",
    },
    {
        url: "/images/AboutUs/COVID.png",
    },
];

const aboutUsContent = {
    title: "About PEBBLE",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida vestibulum est, sit amet ullamcorper massa. Integer sit amet urna nec turpis mattis hendrerit.",
};

const team = [
    {
        avatar: "/images/AboutUs/khalil.jpg",
        name: "Khalil Noui ",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/khalil-noui-pr/",
        GitHub: "https://github.com/Khalil-NOUI",
        desc: "Description for Khalil Noui.",
    },
    {
        avatar: "/images/AboutUs/oualid.jpg",
        name: "Oualid Elhouari ",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/elhouari-oualid",
        GitHub: "https://github.com/oualidelh",
        desc: "Description for Oualid Elhouari.",
    },
    {
        avatar: "/images/AboutUs/Hachem.jpg",
        name: "Hachem Bouhadede",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/hachem-bouhadede/",
        GitHub: "https://github.com/HachemBouhadede",
        desc: "Description for Hachem Bouhadede.",
    },
    {
        avatar: "/images/AboutUs/iman.jpg",
        name: "Imane Omari",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/iman-omari/",
        GitHub: "https://www.linkedin.com/in/iman-omari/",
        desc: "Description for Imane Omari.",
    },
];

const technologiesUsed = [
    {
        id: 1,
        name: "React",
        icon: "/images/tech/react.png",
    },
    {
        id: 2,
        name: "Tailwind CSS",
        icon: "/images/tech/tailwindcss.png",
    },
    {
        id: 3,
        name: "Firebase",
        icon: "/images/tech/firebase.png",
    },
];

const HeroSlider = () => {
    return (
        <div className='absolute items-center justify-center h-screen bg-black'>
            {/* Hero Section */}
            <div className='relative w-screen '>
                <div className='absolute top-0 left-0 w-full h-full bg-black/40 z-[2]'></div>
                <Slide>
                    {slideImages.map((slideImage, index) => (
                        <div
                            key={index}
                            className='h-screen bg-cover bg-center min-w-full object-cover overflow-hidden '
                            style={{
                                backgroundImage: `url(${slideImage.url})`,
                                backgroundRepeat: "no-repeat",
                            }}
                        ></div>
                    ))}
                </Slide>
                <div className='absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-center text-white z-20 hero-text'>
                    <h2 className='text-5xl font-bold mb-5'>PEBBLE</h2>
                </div>
            </div>
            {/* About Us Section */}
            <section className='py-10'>
                <div className='max-w-screen-xl mx-auto text-center md:px-8 bg-slate-200 p-20 rounded-lg'>
                    <div className='max-w-xl mx-auto'>
                        <h2 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                            {aboutUsContent.title}
                        </h2>
                        <p className='text-gray-600 mt-3'>
                            {aboutUsContent.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section>
                <div className='max-w-screen-xl mx-auto px-4 text-center md:px-8 bg-slate-200 p-20 rounded-lg'>
                    <div className='max-w-xl mx-auto'>
                        <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                            Meet our team
                        </h3>
                        <p className=' text-gray-600 mt-3'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            standard dummy.
                        </p>
                    </div>
                    <div className=' mt-12 '>
                        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
                            {team.map((item, idx) => (
                                <div
                                    key={idx}
                                    className='bg-white rounded-lg shadow-md p-6'
                                >
                                    <div className='w-24 h-24 mx-auto mb-4'>
                                        <img
                                            src={item.avatar}
                                            className='w-full h-full rounded-full'
                                            alt=''
                                        />
                                    </div>
                                    <h4 className='text-gray-700 font-semibold text-lg mb-2'>
                                        {item.name}
                                    </h4>
                                    <p className='text-indigo-600 mb-2'>
                                        {item.title}
                                    </p>
                                    <p className='text-gray-600 mb-4'>
                                        {item.desc}
                                    </p>
                                    <div className='flex justify-center gap-4 text-gray-400'>
                                        <div className='flex gap-2'>
                                            <a
                                                href={item.linkedin}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                <FaLinkedin
                                                    size={20}
                                                    className='text-blue-500'
                                                />
                                            </a>
                                            <a
                                                href={item.GitHub}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                <FaGithub
                                                    size={20}
                                                    className='text-gray-700'
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Used Section */}
            <section className='py-14'>
                <div className='max-w-screen-xl mx-auto px-4 text-center md:px-8'>
                    <div className='max-w-xl mx-auto'>
                        <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                            Technologies Used
                        </h3>
                        <div className='mt-6 flex flex-wrap justify-center items-center gap-4'>
                            {technologiesUsed.map((tech) => (
                                <div
                                    key={tech.id}
                                    className='text-gray-600 flex flex-col items-center'
                                >
                                    <img
                                        src={tech.icon}
                                        className='w-16 h-16 rounded-full mb-2'
                                        alt={`${tech.name} Icon`}
                                    />
                                    <span>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSlider;
