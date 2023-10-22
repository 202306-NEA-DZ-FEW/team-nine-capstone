import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { firestore } from "@/lib/firebase/controller";

import Loader from "../loader/Loader";

function EventDetails() {
    const [eventDisplay, setEventDisplay] = useState({});

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const eventRef = doc(firestore, "events", id);
            onSnapshot(eventRef, (docEvent) => {
                setEventDisplay({ ...docEvent.data(), id: docEvent.id });
            });
        }
    }, [id]);

    if (!id || eventDisplay === {}) {
        return <Loader />;
    }

    console.log(eventDisplay);

    return (
        <div className='relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24'>
            <div className='relative'>
                <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 '>
                    <div className='mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 '>
                        <div>
                            <div className='mt-6'>
                                <h1 className='text-3xl font-bold tracking-tight text-white'>
                                    What is{" "}
                                    <span className='font font-thin'>
                                        {" "}
                                        {eventDisplay.title}{" "}
                                    </span>{" "}
                                    ?
                                </h1>
                                <p className='mt-4 text-lg text-gray-300'>
                                    {eventDisplay.about}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 sm:mt-16 lg:mt-0'>
                        <div className='-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                            <Image
                                src={eventDisplay.image}
                                alt='Image 1'
                                width={647}
                                height={486}
                                layout='responsive'
                                className='w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='relative'>
                <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 '>
                    <div className='mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2'>
                        <div>
                            <div className='mt-6'>
                                <h2 className='text-3xl font-bold tracking-tight text-white'>
                                    Participants
                                </h2>
                                <p className='mt-4 text-lg text-gray-300'>
                                    meet our top speakers, from all around the
                                    world, Only for you, eh? how about some
                                    money ? hey its for a good cause , probably
                                    !!!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 sm:mt-16 lg:mt-0'>
                        <div className='-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                            <Image
                                src={eventDisplay.image}
                                alt='Image 1'
                                width={647}
                                height={486}
                                layout='responsive'
                                className='w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='relative'>
                <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 '>
                    <div className='mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 '>
                        <div>
                            <div className='mt-6'>
                                <h2 className='text-3xl font-bold tracking-tight text-white'>
                                    {eventDisplay.title}
                                </h2>
                                <p className='mt-4 text-lg text-gray-300'>
                                    You want to be part of something Bigger !?
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 sm:mt-16 lg:mt-0'>
                        <div className='-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                            <Image
                                src={eventDisplay.image}
                                alt='Image 1'
                                width={647}
                                height={486}
                                layout='fixed'
                                className='w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                            />
                        </div>
                        <div className='mt-6'>
                            <Link
                                className='inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700'
                                href='/'
                            >
                                Join the Event !
                            </Link>
                        </div>
                        {/* this one should be only linked to the user who created the event */}
                        <div className='mt-6'>
                            <Link
                                className='inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700'
                                href={`/events/editEvent/${eventDisplay.id}`}
                            >
                                {" "}
                                Edit Event
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
