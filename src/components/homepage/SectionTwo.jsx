import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { React } from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

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
        <div className='w-full h-full flex flex-col justify-center py-10 items-center bg-bgc-silver mx-auto'>
            {/* global-goals-section */}
            <div className='w-full flex flex-col py-10  lg:px-14'>
                <div className='flex flex-col justify-center items-center py-10 '>
                    <h1 className='text-xl md:text-2xl font-Montserrat text-center lg:text-3xl py-10 text-txtc-DarkCharcoal font-semibold mb-4'>
                        {t("globalGolas.title")}
                    </h1>
                    <p className='text-txtc-DarkCharcoal text-lg text-center font-Lora font-normal leading-6'>
                        {t("globalGolas.discription")}
                    </p>
                </div>
                <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 justify-items-center gap-y-8 justify-self-center py-6 w-full'>
                    {globalGoalsImages.map((goal, index) => (
                        <Link
                            className=' flex w-[60%] h-auto justify-center '
                            href={`${goal.title}`}
                            key={index}
                        >
                            <Image
                                className=' object-cover py-4 transition duration-300 hover:scale-110'
                                src={goal.src}
                                alt={goal.title}
                                width={300}
                                height={300}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* events images section */}
            <div className='flex md:flex-row flex-col px-4 gap-3 md:px-8 py-4'>
                <div className='hidden md:flex flex-col gap-y-3'>
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
                <div className='hidden md:flex flex-col gap-y-3'>
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
            <div className='md:hidden px-2'>
                <Carousel
                    showArrows={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={4000}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                >
                    <div>
                        <image src='/globalGoalsLogos/refugies.png' alt='' />
                    </div>
                    <div>
                        <image src='/globalGoalsLogos/helpOlds.png' alt='' />
                    </div>
                    <div>
                        <image src='/globalGoalsLogos/construct.png' alt='' />
                    </div>
                    <div>
                        <image src='/globalGoalsLogos/donate.png' alt='' />
                    </div>
                </Carousel>
            </div>
            {/* volunteers feedback section */}
            <div className='w-full flex flex-col gap-y-6 py-10 lg:px-14'>
                <h1 className='text-xl md:text-2xl font-Montserrat text-center lg:text-3xl text-txtc-DarkCharcoal font-semibold mb-4'>
                    {t("feedback")}
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center'>
                    {userFeeddBack.map((user, index) => (
                        <div
                            className='flex flex-col overflow-hidden pt-8 px-3 border-2 h-full justify-center items-center gap-2 pb-3 bg-white border-white rounded-md shadow-sm hover:shadow-xl transition duration-200 hover:scale-100'
                            key={index}
                        >
                            <Image
                                className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] md:my-4 lg:w-[80px] lg:h-[80px] rounded-[50%] m-0 p-0  border  border-white border-20 shadow-xl '
                                src={user.Image}
                                alt={user.Name}
                                width={300}
                                height={300}
                            />
                            <h1 className='text-center font-Lora md:text-xl text-sm text-txtc-DarkCharcoal font-semibold'>
                                {user.Name}, {user.Occupation}
                            </h1>
                            <p className='text-center font-OpenSans text-sm text-txtc-DarkCharcoal font-normal'>
                                {user.FeedBack}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='relative w-screen sm:h-1/2'>
                <div className=' top-0 left-0 w-full bg-black/30 z-[2]'>
                    <div
                        className='flex flex-col justify-center items-center bg-cover bg-center min-w-full object-cover overflow-hidden'
                        style={{
                            backgroundImage: `url('/images/image.jpg')`,
                        }}
                    >
                        <div className='flex flex-col text-white font-semibold p-20 pr-[50%]'>
                            <h1 className='text-left text-4xl sm:text-6xl md:w-[35%] lg:w-[60%] mb-3 sm:mb-5'>
                                {t("slogan.title")}
                            </h1>
                            <p className='text-base sm:text-lg lg:w-[100%] text-gray-600 font-normal mb-3 sm:mb-5 '>
                                {t("slogan.discription")}
                            </p>
                            <div className='flex flex-row gap-8 '>
                                <button
                                    onClick={handleUser}
                                    className=' bg-white text-black font-semibold text-xs rounded-md py-2 px-3 whitespace-nowrap overflow-hidden text-overflow-ellipsis'
                                >
                                    {t("Get Started")}
                                </button>
                                <Link
                                    href='/about'
                                    passHref
                                    className='text-txtc-Ivory font-Roboto font-semibold bg-bgc-ForestGreen text-sm rounded-md py-2 px-3 whitespace-nowrap overflow-hidden text-overflow-ellipsis'
                                >
                                    <h2>{t("who are we")}</h2>
                                    {/* <LiaAngleRightSolid className=' mt-1' /> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionTwo;
