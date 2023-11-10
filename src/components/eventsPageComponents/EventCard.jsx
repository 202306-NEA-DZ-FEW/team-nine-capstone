import Link from "next/link";
import React from "react";

import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

function EventCard({ TheEvent }) {
    const { user } = useUser();
    const matchingInterests = TheEvent.interests
        ?.map((element) =>
            interestList.find((interest) => interest.title === element)
        )
        .filter((matchingInterest) => matchingInterest);
    function formatDate() {
        if (TheEvent.date) {
            // Split the date string into day, month, and year
            const dateParts = TheEvent.date.split("/");
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
                return `${dayOfWeek}, ${formattedDay} ${monthName}`;
            } else {
                return `${dayOfWeek}, ${formattedDay} ${monthName} ${yearValue}`;
            }
        }
    }

    const currentDate = new Date(); // You can pass your date here
    const formattedDate = formatDate(currentDate);
    return (
        <div className='flex flex-col w-[95%] shadow-lg my-4 hover:bg-gray-200 h-56 transition duration-300 md:hover:scale-105 hover:scale-95 border-black rounded-md py-2 px-2'>
            <div className='h-[20%] flex flex-row justify-between items-center pb-2'>
                <div className='flex justify-center shadow-md items-center bg-amber-100 md:w-[30%] w-[50%] rounded-md text-xl font-semibold'>
                    {formattedDate}
                </div>
                <div>attendees number</div>
            </div>
            <div className='h-[80%]  flex flex-row gap-3'>
                <div className=' w-[50%] h-[95%] md:w-[30%] overflow-hidden  rounded-lg shadow-md'>
                    <div
                        className='w-full h-full bg-top bg-cover'
                        style={{
                            backgroundImage: `url(${TheEvent.image})`,
                        }}
                    >
                        {/* <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60  group-hover:to-black/70'></div> */}
                    </div>
                </div>
                <div className='w-[65%]  h-[100%] flex flex-col  '>
                    <div className='h-[80%] overflow-hidden'>
                        <div className=' text-green-900 text-2xl font-bold '>
                            {TheEvent.title}
                        </div>
                        <div className='min-h-[50%] text-green-900 text-sm'>
                            {TheEvent.about}
                        </div>
                        <div className='hidden lg:flex flex-row gap-4 h-[15%]'>
                            {matchingInterests?.map((interest) => (
                                <div
                                    className={`flex justify-center items-center bg-${interest.color} h-6 rounded-full px-1 border-2 border-solid border-${interest.color} text-${interest.color}`}
                                    key={interest.title}
                                >
                                    {interest.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col gap-2  min-h-[20%] justify-between mt-2 items-end'>
                        <Link
                            className='flex justify-center bg-amber-400 cursor-pointer font-medium text-sm hover:bg-amber-400 items-center w-28 h-7 self-center  rounded-md shadow-md'
                            href={`/events/${TheEvent.id}`}
                        >
                            {" "}
                            <button className=' text-white'>
                                SEE MORE ...{" "}
                            </button>
                        </Link>
                        <div className='flex justify-center cursor-pointer font-medium text-lg hover:bg-amber-400 items-center w-28 h-10 self-center bg-emerald-500 rounded-md shadow-md'>
                            JOIN
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
