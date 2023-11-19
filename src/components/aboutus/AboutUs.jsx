import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

const AboutUs = () => {
    const { t } = useTranslation();

    const TeamComponent = ({ team }) => {
        const cardsRef = useRef([]);

        useEffect(() => {
            cardsRef.current.forEach((card, idx) => {
                card.style.animation = `slideInFromRight 1s ease-in-out ${
                    idx * 0.5
                }s forwards`;
            });
        }, [team]);

        return (
            <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-4'>
                {team.map((item, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (cardsRef.current[idx] = el)}
                        className='rounded-lg transition duration-300 ease-in-out transform hover:scale-105 sm:max-w-bg-white shadow-md p-2 bg-gray-200'
                        style={{
                            animationDelay: `${idx * 0.8}s`,
                        }}
                    >
                        <div className='w-24 h-24 mx-auto mb-3 rotate-vertical'>
                            <Image
                                src={item.avatar}
                                className='w-full h-full rounded-full'
                                alt=''
                                width={64}
                                height={64}
                            />
                        </div>
                        <h4 className='text-gray-700 font-semibold text-lg mb-2'>
                            {item.name}
                        </h4>
                        <p className='text-indigo-600 mb-2'>{item.title}</p>
                        <p className='text-gray-600 mb-4'>{item.desc}</p>
                        <div className='flex justify-center gap-4 mb-1'>
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
        );
    };

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

    const team = [
        {
            avatar: "/images/AboutUs/khalil.jpg",
            name: t("Khalil Noui"),
            title: t("Web Developer"),
            linkedin: "https://www.linkedin.com/in/khalil-noui-pr/",
            GitHub: "https://github.com/Khalil-NOUI",
            desc: t("desc.khalil"),
        },
        {
            avatar: "/images/AboutUs/oualid.jpg",
            name: t("Oualid Elhouari"),
            title: t("Web Developer"),
            linkedin: "https://www.linkedin.com/in/elhouari-oualid",
            GitHub: "https://github.com/oualidelh",
            desc: t("desc.oualid"),
        },
        {
            avatar: "/images/AboutUs/Hachem.jpg",
            name: t("Hachem Bouhadede"),
            title: t("Web Developer"),
            linkedin: "https://www.linkedin.com/in/hachem-bouhadede/",
            GitHub: "https://github.com/HachemBouhadede",
            desc: t("desc.hachem"),
        },
        {
            avatar: "/images/AboutUs/iman.jpg",
            name: t("Imane Omari"),
            title: t("Web Developer"),
            linkedin: "https://www.linkedin.com/in/iman-omari/",
            GitHub: "https://www.linkedin.com/in/iman-omari/",
            desc: t("desc.imane"),
        },
    ];
    const technologiesUsed = [
        {
            id: 1,
            name: "React",
            icon: "/images/tech/react.png",
            link: "https://react.dev/",
        },
        {
            id: 2,
            name: "Tailwind CSS",
            icon: "/images/tech/tailwindcss.png",
            link: "https://tailwindcss.com/",
        },
        {
            id: 3,
            name: "Firebase",
            icon: "/images/tech/firebase.png",
            link: "https://firebase.google.com/",
        },
        {
            id: 4,
            name: "OpenStreetMap",
            icon: "/images/tech/Street.png",
            link: "https://www.openstreetmap.org/#map=5/28.413/1.653",
        },
        {
            id: 5,
            name: "i18next",
            icon: "/images/tech/translate.png",
            link: "https://www.i18next.com/",
        },
    ];

    return (
        <div className='relative items-center justify-center bg-gray-100'>
            {/* Hero Section */}
            <div className='relative w-screen h-1/2'>
                <div className='absolute top-0 left-0 w-full h-full bg-black/20 z-[2] '></div>
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
            </div>
            {/* About Us Section */}
            <section className='md:m-10 overlay-section'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className='max-w-screen-xl mx-auto rounded-lg py-10'
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className='max-w-xl mx-auto text-center'
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.4 }}
                            className='text-white md:text-black text-3xl font-semibold sm:text-4xl'
                        >
                            {t("about.title")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className='text-white md:text-black mt-3 text-lg'
                        >
                            <span className='text-amber-400 text-xl font-bold mr-2'>
                                Pebble
                            </span>
                            {t("about.pebble")}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>
            {/* Team Section */}
            <section>
                <hr className='md:w-screen' />

                <div className='max-w-screen-xl mx-auto px-4 text-center md:px-20 py-10 mt-5 rounded-lg'>
                    <div className='max-w-xl mx-auto '>
                        <h3 className='text-black text-3xl font-semibold sm:text-4xl'>
                            {t("team.title")}
                        </h3>
                        <p className='text-black mt-3 text-lg'>
                            {t("team.desc")}
                        </p>
                    </div>
                    <div className='mt-12'>
                        <TeamComponent team={team} />
                    </div>
                </div>
            </section>

            {/* Technologies Used Section */}
            <section className='w-full mx-auto px-4 text-center md:px-20 py-20 bg-[url("/images/AboutUs/pc.jpg")] bg-cover'>
                <h3 className='text-white text-3xl font-semibold sm:text-4xl'>
                    {t("Technologies Used")}
                </h3>
                <div className='mt-6 flex flex-wrap justify-center items-center gap-4'>
                    {technologiesUsed.map((tech) => (
                        <div
                            key={tech.id}
                            className='text-white flex flex-col items-center'
                        >
                            <Link href={tech.link}>
                                <Image
                                    src={tech.icon}
                                    className='w-16 h-16 mb-2'
                                    alt={`${tech.name} Icon`}
                                    width={64}
                                    height={64}
                                />
                                <span>{tech.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
