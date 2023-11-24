import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";

import EventTimer from "./EventTimer";

const EventsUp = ({ closestEvent }) => {
    const { t } = useTranslation("common");
    function formatDate() {
        if (closestEvent?.event?.date) {
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
    return (
        <div className='relative w-full h-full flex items-center  overflow-hidden rounded-lg'>
            <div
                className='w-full h-full bg-top bg-cover'
                style={{
                    backgroundImage: `url(${closestEvent.event.image})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className='absolute z-10 flex flex-row justify-center items-center w-full'>
                    <div className=' md:w-1/3 w-2/3  px-3 py-3 md:gap-3 gap-2 text-center flex flex-col justify-center items-center'>
                        <h1 className='text-sm lg:text-lg font-semibold text-amber-100'>
                            {t("eventTimer.Dont Miss The Chance On")}
                        </h1>
                        <h1 className=' w-[90%] flex justify-center items-center text-emerald-100  font-medium text-sm  lg:text-lg xl:text-xl'>
                            {formattedDate}
                        </h1>
                        <h1 className=' w-[90%] font-bold md:text-2xl text-lg text-gray-50'>
                            {closestEvent.event.title}
                        </h1>
                        <Link
                            className='flex justify-center bg-amber-400 cursor-pointer font-medium text-sm hover:bg-amber-400 items-center lg:w-28 w-24 h-5 lg:h-7 self-center  rounded-md shadow-md'
                            href={`/events/${closestEvent.event.id}`}
                        >
                            {t("eventCard.SEE MORE ...")}
                        </Link>
                    </div>
                    <div className='flex flex-col lg:gap-2 gap-1 w-[60%] py-3 text-white items-center justify-center '>
                        <h1 className='lg:text-3xl text-lg  font-bold flex justify-center'>
                            {t("eventTimer.Lanching in...")}
                        </h1>
                        <div className='text-emerald-100'>
                            <EventTimer closestEvent={closestEvent} />
                        </div>
                    </div>
                </div>

                <div></div>
                <div className='bg-black bg-opacity-80 w-full h-full absolute'></div>
            </div>
        </div>
    );
};

export default EventsUp;
