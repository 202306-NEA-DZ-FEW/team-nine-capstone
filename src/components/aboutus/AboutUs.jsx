import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const team = [
    {
        avatar: "/images/khalil.jpg",
        name: "Khalil Noui ",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/khalil-noui-pr/",
        GitHub: "https://github.com/Khalil-NOUI",
    },
    {
        avatar: "/images/oualid.jpg",
        name: "Oualid Elhouari ",
        title: "Developer",
        linkedin: "www.linkedin.com/in/elhouari-oualid",
        GitHub: "https://github.com/oualidelh",
    },
    {
        avatar: "/images/Hachem.jpg",
        name: "Hachem Bouhadede",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/hachem-bouhadede/",
        GitHub: "https://github.com/HachemBouhadede",
    },
    {
        avatar: "/images/iman.jpg",
        name: "Imane Omari",
        title: "Developer",
        linkedin: "https://www.linkedin.com/in/iman-omari/",
        GitHub: "https://www.linkedin.com/in/iman-omari/",
    },
    // {
    //     avatar: "/images/fakeImad.jpg",
    //     name: "Imad Eddine Ketaf",
    //     title: "Developer",
    //     linkedin: "",
    //     GitHub: "javascript:void(0)",
    // },
];
const AboutUs = () => {
    return (
        <section className='py-14'>
            <div className='max-w-screen-xl mx-auto px-4 text-center md:px-8'>
                <div className='max-w-xl mx-auto'>
                    <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Meet our team
                    </h3>
                    <p className='text-gray-600 mt-3'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the standard
                        dummy.
                    </p>
                </div>
                <div className='mt-12'>
                    <ul className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
                        {team.map((item, idx) => (
                            <li key={idx}>
                                <div className='w-24 h-24 mx-auto'>
                                    <img
                                        src={item.avatar}
                                        className='w-full h-full rounded-full'
                                        alt=''
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h4 className='text-gray-700 font-semibold sm:text-lg'>
                                        {item.name}
                                    </h4>
                                    <p className='text-indigo-600'>
                                        {item.title}
                                    </p>
                                    <p className='text-gray-600 mt-2'>
                                        {item.desc}
                                    </p>
                                    <div className='mt-4 flex justify-center gap-4 text-gray-400'>
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
