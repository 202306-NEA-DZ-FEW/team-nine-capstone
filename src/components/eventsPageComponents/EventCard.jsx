import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";

import { getEventDocument } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import JoinButton from "../reusableComponents/JoinButton";

function EventCard({ TheEvent }) {
    const { t } = useTranslation("common");
    const [eventData, setEventData] = useState(null);
    const [joinUpdate, setJoinUpdate] = useState(0);

    // fetch event data
    useEffect(() => {
        const fetchEventData = async () => {
            const eventDoc = await getEventDocument(TheEvent);
            if (eventDoc.exists()) {
                setEventData(eventDoc.data());
            }
        };

        fetchEventData();
    }, [TheEvent, joinUpdate]);

    const matchingInterests = eventData?.interests
        ?.map((element) =>
            interestList.find((interest) => interest.title === element)
        )
        .filter((matchingInterest) => matchingInterest);
    function formatDate() {
        if (eventData?.date) {
            // Split the date string into day, month, and year
            const dateParts = eventData.date.split("/");
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
    if (!eventData || !eventData.image) {
        return null; // Return null or a placeholder component if TheEvent or image is null
    }

    return (
        <div className='flex flex-col w-[95%] shadow-lg my-4 hover:bg-white h-56 transition duration-300 md:hover:scale-105 hover:scale-95 border-black rounded-md py-2 px-2'>
            <div className='h-[20%] flex flex-row justify-between items-center pb-2'>
                <div className='flex justify-center text-[16px] shadow-md items-center bg-emerald-100 md:w-[30%] w-[50%] rounded-md lg:text-lg font-semibold'>
                    {formattedDate}
                </div>
                <div className='flex justify-center gap-4 px-2 items-center md:w-auto md:rounded-full md:bg-gray-200 w-[50%] rounded-lg text-lg font-medium'>
                    {eventData.attendees ? (
                        <>
                            {eventData.attendees.length}{" "}
                            {t("eventCard.attendees")}
                            <div>
                                <FaPeopleGroup />
                            </div>
                        </>
                    ) : (
                        <h1 className='text-sm h-6'>
                            {t("eventCard.Be The First attendee")}
                        </h1>
                    )}
                </div>
            </div>
            <div className='h-[80%]  flex flex-row gap-3'>
                <div className=' w-[50%] h-[95%] md:w-[30%] overflow-hidden  rounded-lg shadow-md'>
                    <div
                        className='w-full h-full bg-top bg-cover'
                        style={{
                            backgroundImage: `url(${eventData.image})`,
                        }}
                    >
                        {/* <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60  group-hover:to-black/70'></div> */}
                    </div>
                </div>
                <div className='w-[65%]  h-[100%] flex flex-col  '>
                    <div className='h-[80%] overflow-hidden'>
                        <div className=' text-green-900 text-2xl font-bold '>
                            {eventData.title}
                        </div>
                        <div className='max-h-[50%] overflow-hidden text-green-900 text-sm'>
                            {eventData.about}
                        </div>
                        <div className='hidden lg:flex flex-row gap-4 h-[20%]'>
                            {matchingInterests?.slice(0, 4).map((interest) => (
                                <div
                                    className={`flex justify-center items-center xl:text-lg text-sm px-2  h-7 rounded-full bg-amber-100 border border-solid border-amber-400 text-${interest.color}-700 font-medium`}
                                    key={interest.title}
                                >
                                    {t(interest.title)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col gap-2 min-h-[20%] justify-between mt-2 items-end'>
                        <Link
                            className='flex justify-center bg-amber-400 cursor-pointer font-medium text-sm hover:bg-amber-400 items-center w-28 h-7 self-center  rounded-md shadow-md'
                            href={`/events/${TheEvent}`}
                        >
                            {" "}
                            <button className=' text-white'>
                                {t("eventCard.SEE MORE ...")}{" "}
                            </button>
                        </Link>
                        <div className='flex justify-center cursor-pointer font-medium text-lg hover:bg-amber-400 items-center w-28 h-7 self-center bg-emerald-500 rounded-md shadow-md'>
                            <JoinButton
                                eOwner={eventData.createdBy}
                                eventId={TheEvent}
                                eAttendees={eventData.attendees}
                                setJoinUpdate={setJoinUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
