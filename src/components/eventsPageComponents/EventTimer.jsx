import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { getRemainingTimeUntilMsTimestamp } from "../util/countDownTimer";

const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
    months: "00",
    years: "00",
};

const EventTimer = ({ closestEvent }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const [joinUpdate, setJoinUpdate] = useState(0);
    const { t } = useTranslation("common");
    function formatDate() {
        if (closestEvent.event?.date) {
            // Split the date string into day, month, and year
            const dateParts = closestEvent.event.date.split("/");
            const day = parseInt(dateParts[0], 10); // Parse day as an integer
            const month = parseInt(dateParts[1], 10) - 1; // Parse month as an integer (0-based)
            const year = parseInt(dateParts[2], 10);

            const date = new Date(year, month, day); // Create a date object

            const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
            ];
            const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            const dayOfWeek = daysOfWeek[date.getDay()];
            const formattedDay = ("0" + day).slice(-2); // Pads with zero if needed
            const monthName = months[month];
            const yearValue = year;

            if (new Date().getFullYear() === yearValue) {
                return `${t(dayOfWeek)}, ${formattedDay} ${t(monthName)}`;
            } else {
                return `${t(dayOfWeek)}, ${formattedDay} ${t(
                    monthName
                )} ${yearValue}`;
            }
        }
    }
    const currentDate = new Date(); // You can pass your date here
    const formattedDate = formatDate(currentDate);
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(closestEvent.targetDate);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [closestEvent.targetDate]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
    return (
        <div className='relative w-full h-full overflow-hidden rounded-lg'>
            <div
                className='w-full h-full bg-top bg-cover'
                style={{
                    backgroundImage: `url(${closestEvent.event.image})`,
                    backgroundSize: "100%", // or "cover", "50%", etc. based on your preference
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className='absolute w-1/3 px-3 py-3 lg:gap-2 gap-1 text-center flex z-10 flex-col justify-center items-center'>
                    <h1 className='lg:text-lg text-xs font-semibold text-amber-100'>
                        {t("eventTimer.Dont Miss The Chance On")}
                    </h1>
                    <h1 className=' w-[90%]  flex justify-center items-center text-emerald-100  font-medium text-sm lg:text-xl'>
                        {formattedDate}
                    </h1>
                    <h1 className=' w-[90%] font-bold lg:text-2xl text-lg text-gray-50'>
                        {closestEvent.event.title}
                    </h1>
                    <Link
                        className='flex justify-center bg-amber-400 cursor-pointer font-medium text-sm hover:bg-amber-400 items-center lg:w-28 w-24 h-5 lg:h-7 self-center  rounded-md shadow-md'
                        href={`/events/${closestEvent.event.id}`}
                    >
                        {t("eventCard.SEE MORE ...")}
                    </Link>
                </div>
                <div className='absolute z-10 top-8 left-1/3 flex flex-col gap-2 text-white'>
                    <h1 className='text-xl font-bold flex justify-center'>
                        {t("eventTimer.Lanching in...")}
                    </h1>
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-col '>
                            <span className='w-10 h-14 text-emerald-100 bg-green-950 rounded-sm text-3xl flex justify-center items-center'>
                                {remainingTime.years}
                            </span>
                            <span className='text-emerald-100 flex justify-center items-center'>
                                {t("eventTimer.Y")}
                            </span>
                        </div>
                        <div className='flex flex-col '>
                            <span className='w-10 h-14 text-emerald-100 bg-green-950 rounded-sm text-3xl flex justify-center items-center'>
                                {remainingTime.months}
                            </span>
                            <span className='text-emerald-100 flex justify-center items-center'>
                                {t("eventTimer.Mo")}
                            </span>
                        </div>
                        <div className='flex flex-col '>
                            <span className='w-10 h-14 text-emerald-100 bg-green-950 rounded-sm text-3xl flex justify-center items-center'>
                                {remainingTime.days}
                            </span>
                            <span className='text-emerald-100 flex justify-center items-center'>
                                {t("eventTimer.D")}
                            </span>
                        </div>
                        <div className='flex flex-col '>
                            <span className='w-10 h-14 text-emerald-100 bg-green-950 rounded-sm text-3xl flex justify-center items-center'>
                                {remainingTime.hours}
                            </span>
                            <span className='text-emerald-100 flex justify-center items-center'>
                                {t("eventTimer.H")}
                            </span>
                        </div>
                        <div className='flex flex-col '>
                            <span className='w-10 h-14 text-emerald-100 bg-green-950 rounded-sm text-3xl flex justify-center items-center'>
                                {remainingTime.minutes}
                            </span>
                            <span className='text-emerald-100 flex justify-center items-center'>
                                {t("eventTimer.Mi")}
                            </span>
                        </div>{" "}
                        <div className='hidden md:flex flex-col '>
                            <span className='w-10 h-14 text-emerald-100 bg-green-950 rounded-sm text-3xl flex justify-center items-center'>
                                {remainingTime.seconds}
                            </span>
                            <span className=' text-emerald-100 flex justify-center items-center'>
                                {t("eventTimer.S")}
                            </span>
                        </div>
                    </div>
                </div>
                <div></div>
                <div className='bg-black bg-opacity-70 w-full h-full absolute'></div>
            </div>
        </div>
    );
};

export default EventTimer;
