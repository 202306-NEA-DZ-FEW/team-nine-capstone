import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { getEventDocument } from "@/lib/firebase/controller";

import JoinButton from "./JoinButton";

function UserProfileEventCard({ id }) {
    const { t } = useTranslation("common");
    const [eventData, setEventData] = useState(null);
    const [hover, setHover] = useState(false);
    const [joinUpdate, setJoinUpdate] = useState(0);

    //fetch event data
    useEffect(() => {
        const fetchEventData = async () => {
            const eventDoc = await getEventDocument(id);
            if (eventDoc.exists()) {
                setEventData(eventDoc.data());
            }
        };

        fetchEventData();
    }, [id, joinUpdate]);

    return (
        <div
            className='relative'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {eventData && (
                <>
                    <div
                        className={`h-96 w-72 m-5 flex justify-center ${
                            hover ? "blur-sm" : ""
                        }`}
                    >
                        <div className='w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden'>
                            <div className='relative'>
                                <img
                                    src={eventData.image}
                                    alt={eventData.title}
                                    className='h-56 w-full object-cover'
                                />
                                <h1 className='absolute bottom-0 w-full py-2 text-xl text-center bg-amber-400 bg-opacity-50'>
                                    {eventData.title}
                                </h1>
                            </div>
                            <div className='px-6 py-4'>
                                <div className='font-bold text-xl mb-2'>
                                    {eventData.location}
                                </div>
                                <div className='font-bold text-xl mb-2'>
                                    {eventData.date}
                                </div>
                            </div>
                            {eventData.interests && (
                                <div className='flex flex-wrap px-6 py-4'>
                                    {eventData.interests
                                        .slice(0, 3)
                                        .map((interest) => (
                                            <span
                                                key={interest}
                                                className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    {eventData.interests.length > 3 && (
                                        <span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                            {t("profile.more")}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='hover-content'>
                        {hover && (
                            <div className='absolute w-5/6 h-1/2 flex flex-col items-center top-20 left-7 right-0 bottom-0 space-y-5 bg-white shadow-lg rounded-lg bg-opacity-50'>
                                <span className='text-xl'>
                                    {eventData.attendees.length}{" "}
                                    {t("profile.attendees")}
                                </span>
                                <Link
                                    href={`/events/${id}`}
                                    className='w-40 h-14 rounded-lg bg-amber-400 hover:bg-green-400 text-white text-xl text-center'
                                >
                                    {" "}
                                    <button className='w-full h-full'>
                                        {t("profile.LearnMore")}
                                    </button>
                                </Link>

                                <button className='w-40 h-14 rounded-lg bg-amber-400 hover:bg-green-400 text-white text-xl'>
                                    <JoinButton
                                        eventId={id}
                                        eAttendees={eventData.attendees}
                                        setJoinUpdate={setJoinUpdate}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserProfileEventCard;
