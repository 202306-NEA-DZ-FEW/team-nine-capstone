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
    const { t } = useTranslation("common");

    let date;

    if (typeof closestEvent.date === "string") {
        const dateParts = closestEvent.date.split("/");
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based
        const year = parseInt(dateParts[2], 10);

        date = new Date(year, month, day);
    } else {
        date = closestEvent.date;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(date);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [date]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
    return (
        <div className='w-[300px] grid md:grid-cols-6 grid-cols-3 justify-items-center place-items-center px-5 md:px-2 gap-2'>
            <div className='flex flex-col justify-center  items-center'>
                <span className='md:w-10 md:h-14 h-11 w-8   rounded-sm text-xl md:text-3xl flex justify-center items-center'>
                    {remainingTime.years}
                </span>
                <span className=' text-xs md:text-sm flex justify-center items-center'>
                    {t("eventTimer.Y")}
                </span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='md:w-10 md:h-14 h-11 w-8   rounded-sm text-xl md:text-3xl flex justify-center items-center'>
                    {remainingTime.months}
                </span>
                <span className=' text-xs md:text-sm flex justify-center items-center'>
                    {t("eventTimer.Mo")}
                </span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='md:w-10 md:h-14 h-11 w-8  rounded-sm text-xl md:text-3xl flex justify-center items-center'>
                    {remainingTime.days}
                </span>
                <span className=' text-xs md:text-sm flex justify-center items-center'>
                    {t("eventTimer.D")}
                </span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='md:w-10 md:h-14 h-11 w-8   rounded-sm text-xl md:text-3xl flex justify-center items-center'>
                    {remainingTime.hours}
                </span>
                <span className=' text-xs md:text-sm flex justify-center items-center'>
                    {t("eventTimer.H")}
                </span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span className='md:w-10 md:h-14 h-11 w-8   rounded-sm text-xl md:text-3xl flex justify-center items-center'>
                    {remainingTime.minutes}
                </span>
                <span className=' text-xs md:text-sm flex justify-center items-center'>
                    {t("eventTimer.Mi")}
                </span>
            </div>{" "}
            <div className='flex flex-col justify-center items-center'>
                <span className='md:w-10 md:h-14 h-11 w-8   rounded-sm text-xl md:text-3xl flex justify-center items-center'>
                    {remainingTime.seconds}
                </span>
                <span className='  text-xs md:text-sm flex justify-center items-center'>
                    {t("eventTimer.S")}
                </span>
            </div>
        </div>
    );
};

export default EventTimer;
