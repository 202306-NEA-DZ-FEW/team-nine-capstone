import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";

import { eventsCollection } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function EventCard({ TheEvent }) {
    const { user } = useUser();
    const router = useRouter();
    const docRef = doc(eventsCollection, TheEvent.id);
    // var to handle translatons
    const { t } = useTranslation();
    // method to handle attendees
    const handleAttendees = () => {
        if (user) {
            // Check if 'TheEvent.attendees' is an array, and if not, initialize it as an empty array
            const attendees = Array.isArray(TheEvent.attendees)
                ? TheEvent.attendees
                : [];

            // Check if the user's ID is already in the 'attendees' array
            const userIndex = attendees.indexOf(user.uid);

            if (userIndex !== -1) {
                // If the user's ID is already in the array, remove it
                attendees.splice(userIndex, 1);
            } else {
                // If the user's ID is not in the array, add it
                attendees.push(user.uid);
            }

            // Create the updated event object with the modified 'attendees' array
            const updatedTheEvent = {
                attendees,
            };

            // Update the event document with the new 'updatedTheEvent' data
            updateDoc(docRef, updatedTheEvent);
        } else {
            router.push("/authentication/signUp");
        }
    };
    return (
        <div className='mx-auto bg-gray-700 flex items-center justify-center px-8 py-8'>
            <div className='flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5'>
                <div
                    className='w-full h-64 bg-top bg-cover rounded-t'
                    style={{
                        backgroundImage: `url(${TheEvent.image})`,
                    }}
                ></div>
                <div className='flex flex-col w-full md:flex-row'>
                    <div className='flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4'>
                        <div className='md:text-xl'>{TheEvent.date}</div>
                    </div>

                    <div className='p-4 font-normal text-gray-800 md:w-3/4'>
                        <h1 className='mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800'>
                            {TheEvent.title}
                        </h1>
                        <p className='leading-normal'>{TheEvent.about}</p>
                        <div className='flex flex-row items-center mt-4 text-gray-700'>
                            <Link
                                href={`/events/${TheEvent.id}`}
                                className='w-1/2'
                            >
                                {" "}
                                <button className='w-1/2 border border-gray-600'>
                                    More ...{" "}
                                </button>
                            </Link>
                            <div className='w-1/2 flex justify-end'>
                                {/* <Image
                                    src='/logo-image.jpg'
                                    alt='Sponsor Logo'
                                    width={100}
                                    height={100}
                                    className='w-8'
                                /> */}
                            </div>
                            <div className='flex flex-col w-48'>
                                <div className='flex flex-row justify-center items-center gap-2'>
                                    <FaPeopleGroup />{" "}
                                    {TheEvent.attendees &&
                                    TheEvent.attendees.length > 0 ? (
                                        <div className='flex flex-row'>
                                            {TheEvent.attendees.length}{" "}
                                            attendees
                                        </div>
                                    ) : (
                                        "BE THE FIRST TO JOIN"
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer  flex flex-row justify-center bg-amber-500 text-lg font-medium items-center w-20 rounded-sm shadow-lg text-white self-end gap-x-3 ${
                                        TheEvent.attendees.indexOf(user.uid) >
                                        -1
                                            ? "bg-gray-300 text-black"
                                            : "hover:bg-emerald-500 transition-all duration-200"
                                    }`}
                                    onClick={handleAttendees}
                                >
                                    {TheEvent.attendees.indexOf(user.uid) > -1
                                        ? "JOINED"
                                        : "JOIN"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
