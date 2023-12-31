import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";

import { getEventDocument, getUserDocument } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

import EventsSave from "./EventsSave";
import JoinButton from "../reusableComponents/JoinButton";

function EventCard({ TheEvent }) {
    const { t } = useTranslation("common");
    const [eventData, setEventData] = useState(null);
    const [joinUpdate, setJoinUpdate] = useState(0);
    const [userDoc, setUserDoc] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        const fetchUserDocument = async () => {
            if (user) {
                const doc = await getUserDocument(user.uid);
                if (doc.exists()) {
                    setUserDoc({ ...doc.data(), id: doc.id });
                } else {
                    setUserDoc(null);
                }
            }
        };

        fetchUserDocument();
    }, [user]);
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
            const dateParts = eventData.date.split("/");
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const year = parseInt(dateParts[2], 10);

            const date = new Date(year, month, day);

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
            const formattedDay = ("0" + day).slice(-2);
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

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    if (!eventData || !eventData.image) {
        return null;
    }

    return (
        <div className='flex flex-col w-[95%] shadow-lg my-4 hover:bg-white h-56 transition duration-300 md:hover:scale-105 hover:scale-95 border-black rounded-md py-2 px-2'>
            <div className='h-[20%] flex flex-row justify-between items-center pb-2'>
                <div className='flex justify-center text-[16px] shadow-md items-center bg-emerald-100 md:w-[30%] w-[50%] rounded-md lg:text-lg font-semibold'>
                    {formattedDate}
                </div>
                <div className='text-xl'>
                    <EventsSave userDoc={userDoc} eventId={TheEvent} />
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
                    ></div>
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
                            {matchingInterests?.slice(0, 3).map((interest) => (
                                <div
                                    className='flex justify-center items-center truncate text-sm px-2  h-7 rounded-full bg-gray-200  text-black font-medium'
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
