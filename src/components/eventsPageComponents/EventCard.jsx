import Link from "next/link";
import React from "react";

import { useUser } from "@/context/UserContext";

function EventCard({ TheEvent }) {
    const { user } = useUser();

    // console.log("TheEvent structure", TheEvent);
    // console.log(TheEvent.data);
    // const { user } = useUser();
    // console.log(user)

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
