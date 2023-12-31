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
            Name: t("mockUser.one.name"),
            Occupation: t("mockUser.one.occupation"),
            Image: "/globalGoalsLogos/feedback3.jpg",
            FeedBack: t("mockUser.one.comment"),
        },
        {
            Name: t("mockUser.two.name"),
            Occupation: t("mockUser.two.occupation"),
            Image: "/globalGoalsLogos/feedback5.jpg",
            FeedBack: t("mockUser.two.comment"),
        },
        {
            Name: t("mockUser.three.name"),
            Occupation: t("mockUser.three.occupation"),
            Image: "/globalGoalsLogos/feedback6.jpg",
            FeedBack: t("mockUser.three.comment"),
        },
    ];
    return (
        <div className='w-full h-full flex flex-col justify-center py-10 items-center bg-bgc-silver mx-auto'>
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

            <div className='flex md:flex-row flex-col bg-bgc-silver px-4 gap-3 md:px-8 py-4'>
                <div className='hidden md:flex flex-col gap-y-3'>
                    <div className='object-fill rounded-md overflow-hidden'>
                        <Image
                            className='w-full h-full transition duration-300 hover:scale-110'
                            src='/globalGoalsLogos/refugies.png'
                            alt=''
                            width={800}
                            height={800}
                        />
                    </div>
                    <div className='object-fill rounded-md overflow-hidden'>
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
                    <div className=' rounded-md overflow-hidden'>
                        <Image
                            className='object-fill w-full h-full transition duration-300 hover:scale-110'
                            src='/globalGoalsLogos/construct.png'
                            alt=''
                            width={800}
                            height={800}
                        />
                    </div>
                    <div className='object-fill rounded-md overflow-hidden'>
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
                    interval={2000}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                >
                    <div>
                        <Image
                            src='/globalGoalsLogos/refugies.png'
                            alt='refugies'
                            width={800}
                            height={800}
                        />
                    </div>
                    <div>
                        <Image
                            src='/globalGoalsLogos/helpOlds.png'
                            alt='helpOlds'
                            width={800}
                            height={800}
                        />
                    </div>
                    <div>
                        <Image
                            src='/globalGoalsLogos/construct.png'
                            alt='construct'
                            width={800}
                            height={800}
                        />
                    </div>
                    <div>
                        <Image
                            src='/globalGoalsLogos/donate.png'
                            alt='donate'
                            width={800}
                            height={800}
                        />
                    </div>
                </Carousel>
            </div>
            <div className='w-full flex flex-col gap-y-6 py-10 lg:px-14'>
                <h1 className='text-xl md:text-2xl font-Montserrat text-center lg:text-3xl text-txtc-DarkCharcoal font-semibold mb-4'>
                    {t("feedback")}
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center'>
                    {userFeeddBack.map((user, index) => (
                        <div
                            className='flex flex-col overflow-hidden pt-8 px-3 h-full justify-center items-center gap-2 pb-3 bg-bgc-silver rounded-md hover:shadow-xl transition duration-200 hover:scale-100'
                            key={index}
                        >
                            <Image
                                className='md:my-4 rounded-[50%] m-0 p-0  '
                                src={user.Image}
                                alt={user.Name}
                                height={120}
                                width={120}
                                objectFit='cover'
                            />
                            <h1 className='text-center font-Montserrat md:text-xl text-sm text-txtc-DarkCharcoal font-semibold'>
                                {user.Name}, {user.Occupation}
                            </h1>
                            <p className='text-center font-Opensans font-normal text-sm text-txtc-DarkCharcoal'>
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
