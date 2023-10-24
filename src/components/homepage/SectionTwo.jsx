import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { React } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";

import { useUser } from "@/context/UserContext";

const SectionTwo = () => {
    const router = useRouter();
    const { user } = useUser();
    // sets the routing according to the user's state
    const handleUser = () => {
        user ? router.push("/events") : router.push("/authentication/signUp");
    };
    const { t } = useTranslation();
    const globalGoalsImages = [
        {
            title: "no Poverty",
            src: "/globalGoalsLogos/1.png",
        },
        {
            title: "zero Hunger",
            src: "/globalGoalsLogos/2.png",
        },
        {
            title: "good Health",
            src: "/globalGoalsLogos/3.png",
        },
        {
            title: "quality Education",
            src: "/globalGoalsLogos/4.png",
        },
        {
            title: "gender Equality",
            src: "/globalGoalsLogos/5.png",
        },
        {
            title: "clean Water",
            src: "/globalGoalsLogos/6.png",
        },
        {
            title: "clean Energy",
            src: "/globalGoalsLogos/7.png",
        },
        {
            title: "decent Work",
            src: "/globalGoalsLogos/8.png",
        },
        {
            title: "inovation",
            src: "/globalGoalsLogos/9.png",
        },
        {
            title: "reduced In Equalities",
            src: "/globalGoalsLogos/10.png",
        },
        {
            title: "sustainable Cities",
            src: "/globalGoalsLogos/11.png",
        },
        {
            title: "responsible Consumption",
            src: "/globalGoalsLogos/12.png",
        },
        {
            title: "climate Action",
            src: "/globalGoalsLogos/13.png",
        },
        {
            title: "life Below Water",
            src: "/globalGoalsLogos/14.png",
        },
        {
            title: "life On Land",
            src: "/globalGoalsLogos/15.png",
        },
        {
            title: "peace",
            src: "/globalGoalsLogos/16.png",
        },
        {
            title: "partnership",
            src: "/globalGoalsLogos/17.png",
        },
        {
            title: "global",
            src: "/globalGoalsLogos/Rounded.png",
        },
    ];
    const userFeeddBack = [
        {
            Name: "flan",
            Occupation: "apple",
            Image: "/globalGoalsLogos/user.png",
            FeedBack: "Lorem ipsum dolor sit amet consectetur adipisicing",
        },
        {
            Name: "flan",
            Occupation: "apple",
            Image: "/globalGoalsLogos/user.png",
            FeedBack: "Lorem ipsum dolor sit amet consectetur adipisicing",
        },
        {
            Name: "flan",
            Occupation: "apple",
            Image: "/globalGoalsLogos/user.png",
            FeedBack: "Lorem ipsum dolor sit amet consectetur adipisicing",
        },
    ];
    return (
        <div className='container mx-auto  flex  flex-col justify-center items-center gap-y-10'>
            {/* global-goals-section */}
            <div className='flex flex-col gap-y-9 mt-16'>
                <div className='flex flex-col justify-center items-center gap-6 '>
                    <h1 className='text-center text-2xl text-gray-950 font-bold'>
                        {t("globalGolas.title")}
                    </h1>
                    <p className='md:w-[50%] w-[80%] text-center text-sm text-gray-400 font-normal'>
                        {t("globalGolas.discription")}
                    </p>
                </div>
                <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-items-center justify-self-center gap-2 w-full'>
                    {globalGoalsImages.map((goal, index) => (
                        <Link
                            className=' flex w-[60%] h-auto justify-center '
                            href={`${goal.title}`}
                            key={index}
                        >
                            <Image
                                className=' object-cover m-0 p-0 transition duration-300 hover:scale-110'
                                src={goal.src}
                                alt={goal.title}
                                width={300}
                                height={300}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            {/* volunteers feedback section */}
            <div className=' flex flex-col gap-y-4 py-6 mt-16 w-[88%] '>
                <h1 className='text-center text-2xl text-gray-950 font-bold mb-7'>
                    {t("feedback")}
                </h1>
                <div className='flex md:flex-row flex-col items-center px-10 gap-6 justify-center w-[100%] h-auto mx-auto'>
                    {userFeeddBack.map((user, index) => (
                        <div
                            className='flex flex-col overflow-hidden pt-8 px-3 border-y-2 h-full justify-center items-center border gap-2 pb-3  border-white rounded-md shadow-sm hover:shadow-xl transition duration-200 hover:scale-100'
                            key={index}
                        >
                            <Image
                                className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] md:my-4 lg:w-[80px] lg:h-[80px] rounded-[50%] m-0 p-0  border  border-white border-20 shadow-xl '
                                src={user.Image}
                                alt={user.Name}
                                width={300}
                                height={300}
                            />
                            <h1 className='text-center md:text-xl text-sm text-gray-950 font-bold'>
                                {user.Name}, {user.Occupation}
                            </h1>
                            <p className='text-center text-sm text-gray-400 font-normal'>
                                {user.FeedBack}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* events mages section */}
            <div className='flex md:flex-row flex-col  px-4 gap-3 mt-16 md:px-8'>
                <div className='flex flex-col  gap-y-3'>
                    <div className='h-[40%] rounded-md overflow-hidden shadow-md'>
                        <Image
                            className='w-full h-full transition duration-300 hover:scale-110'
                            src='/globalGoalsLogos/refugies.png'
                            alt=''
                            width={800}
                            height={800}
                        />
                    </div>
                    <div className='h-[60%] rounded-md overflow-hidden shadow-md'>
                        <Image
                            className='w-full h-full transition duration-300 hover:scale-110'
                            src='/globalGoalsLogos/helpOlds.png'
                            alt=''
                            width={800}
                            height={800}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-y-3'>
                    <div className='h-[55%] rounded-md overflow-hidden shadow-md'>
                        <Image
                            className='w-full h-full transition duration-300 hover:scale-110'
                            src='/globalGoalsLogos/construct.png'
                            alt=''
                            width={800}
                            height={800}
                        />
                    </div>
                    <div className='h-[45%] rounded-md overflow-hidden shadow-md'>
                        <Image
                            className='w-full h-full transition duration-300 hover:scale-110'
                            src='/globalGoalsLogos/donate.png'
                            alt=''
                            width={800}
                            height={800}
                        />
                    </div>
                </div>
            </div>
            {/* slogan and started button */}
            <div className='flex flex-col justify-center items-center gap-y-4 my-14 px-4'>
                <h1 className='flex justify-center items-center text-center text-2xl text-gray-950 font-bold'>
                    {t("slogan.title")}
                </h1>
                <p className='flex justify-center items-center w-[80%] md:w-[50%] text-center text-sm text-gray-400 font-normal'>
                    {t("slogan.discription")}
                </p>
                <div className='flex md:flex-row flex-col justify-center items-center gap-6'>
                    <div className='flex justify-end '>
                        <button
                            onClick={handleUser}
                            className='flex justify-center items-center  hover:bg-cyan-500  bg-teal-600 text-white font-normal text-sm  rounded h-8 w-20'
                        >
                            {t("Get Started")}
                        </button>
                    </div>

                    <Link
                        href='/about'
                        className='flex justify-start items-center gap-x-2'
                    >
                        <h2>{t("who are we")}</h2>
                        <LiaAngleRightSolid />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SectionTwo;
