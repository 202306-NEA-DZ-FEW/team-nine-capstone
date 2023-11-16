import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { firestore } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

import EventTimer from "../eventsPageComponents/EventTimer";
import Loader from "../loader/Loader";
import JoinButton from "../reusableComponents/JoinButton";

function EventDetails() {
    const [myEvents, setMyEvents] = useState([]);
    const [eventDisplay, setEventDisplay] = useState({});
    const { t } = useTranslation("common");
    console.log("eventdisplay", eventDisplay);
    const router = useRouter();
    const { id } = router.query;
    console.log("idd", id);
    console.log("this is router.asPath", router.asPath);
    const { user, setUser } = useUser();
    const matchingInterests = eventDisplay?.interests
        ?.map((element) =>
            interestList.find((interest) => interest.title === element)
        )
        .filter((matchingInterest) => matchingInterest);

    function JoinEvent() {
        if (user) {
            const userRef = doc(firestore, "users", user.uid);

            getDoc(userRef)
                .then((userDoc) => {
                    const existEvent = userDoc.data().iEvents;

                    const updatedEvents = [...existEvent, id];

                    return updateDoc(userRef, {
                        iEvents: updatedEvents,
                    });
                })
                .catch((error) => {
                    console.log("the error:", error);
                });
        } else {
            alert("please sign in or sign up first");
        }
    }
    const userId = eventDisplay.createdBy;
    const [userDetails, setUserDetails] = useState(null);

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         const userRef = doc(firestore, "users", userId);

    //         try {
    //             const userDoc = await getDoc(userRef);

    //             if (userDoc.exists()) {
    //                 const details = userDoc.data();
    //                 setUserDetails(details);
    //                 console.log("User details:", details);
    //             } else {
    //                 console.log("User not found.");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user details:", error);
    //         }
    //     };

    //     fetchUserDetails();
    // }, [userId]);

    useEffect(() => {
        if (id) {
            const eventRef = doc(firestore, "events", id);
            onSnapshot(eventRef, (docEvent) => {
                setEventDisplay({ ...docEvent.data(), id: docEvent.id });
            });
        }
        if (userId) {
            const eventRef = doc(firestore, "users", userId);
            onSnapshot(eventRef, (docEvent) => {
                setUserDetails({ ...docEvent.data(), id: docEvent.id });
            });
        }
    }, [id]);
    console.log("userDetails ", userDetails);
    if (!id || Object.keys(eventDisplay).length === 0) {
        return <Loader />;
    }

    return (
        // <div className='relative overflow-hidden bg-gray-200 pt-16 pb-32 space-y-24'>
        //     <div className='relative'>
        //         <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 '>
        //             <div className='mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 '>
        //                 <div>
        //                     <div className='mt-6'>
        //                         <h1 className='text-3xl font-bold tracking-tight text-white'>
        //                             What is{" "}
        //                             <span className='font font-thin'>
        //                                 {" "}
        //                                 {eventDisplay.title}{" "}
        //                             </span>{" "}
        //                             ?
        //                         </h1>
        //                         <p className='mt-4 text-lg text-gray-300'>
        //                             {eventDisplay.about}
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className='mt-12 sm:mt-16 lg:mt-0'>
        //                 <div className='-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
        //                     <Image
        //                         src={eventDisplay.image}
        //                         alt='Image 1'
        //                         width={647}
        //                         height={486}
        //                         layout='responsive'
        //                         className='w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div className='relative'>
        //         <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 '>
        //             <div className='mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2'>
        //                 <div>
        //                     <div className='mt-6'>
        //                         <h2 className='text-3xl font-bold tracking-tight text-white'>
        //                             Participants
        //                         </h2>
        //                         <p className='mt-4 text-lg text-gray-300'>
        //                             meet our top speakers, from all around the
        //                             world, Only for you, eh? how about some
        //                             money ? hey its for a good cause , probably
        //                             !!!
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className='mt-12 sm:mt-16 lg:mt-0'>
        //                 <div className='-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
        //                     <Image
        //                         src={eventDisplay.image}
        //                         alt='Image 1'
        //                         width={647}
        //                         height={486}
        //                         layout='responsive'
        //                         className='w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <SocialShare
        //         path={router.asPath}
        //         title={eventDisplay.title}
        //         quote={eventDisplay.about}
        //     />

        //     <div className='relative'>
        //         <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 '>
        //             <div className='mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 '>
        //                 <div>
        //                     <div className='mt-6'>
        //                         <h2 className='text-3xl font-bold tracking-tight text-white'>
        //                             {eventDisplay.title}
        //                         </h2>
        //                         <p className='mt-4 text-lg text-gray-300'>
        //                             You want to be part of something Bigger !?
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className='mt-12 sm:mt-16 lg:mt-0'>
        //                 <div className='-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
        //                     <Image
        //                         src={eventDisplay.image}
        //                         alt='Image 1'
        //                         width={647}
        //                         height={486}
        //                         layout='fixed'
        //                         className='w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
        //                     />
        //                 </div>
        //                 <div className='mt-6'>
        //                     <Link
        //                         className='inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700'
        //                         href='/events/yourEvents'
        //                         onClick={JoinEvent}
        //                     >
        //                         Join the Event !
        //                     </Link>
        //                 </div>
        //                 {/* this one should be only linked to the user who created the event */}
        //                 <div className='mt-6'>
        //                     <Link
        //                         className='inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700'
        //                         href={`/events/editEvent/${eventDisplay.id}`}
        //                     >
        //                         {" "}
        //                         Edit Event
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='flex flex-col  bg-gray-200 h-auto w-full'>
            <div className='flex flex-row pt-3 h-[70%] gap-4 px-5 bg-gray-50 '>
                <div className='w-[75%] rounded-lg shadow-lg  h-[150vh]'>
                    <div className='relative w-full h-[50%] overflow-hidden rounded-lg flex flex-col justify-center  items-center'>
                        <div
                            className='w-full h-[90%] absolute top-0 bg-top bg-cover'
                            style={{
                                backgroundImage: `url(${eventDisplay.image})`,
                            }}
                        >
                            <div className='bg-black bg-opacity-60 w-full h-full absolute'></div>
                        </div>
                        <div className='relative absolut z-10 w-[70%] h-48 '>
                            <div className='absolute z-10 w-full flex justify-center items-center flex-col'>
                                <div className=' text-3xl text-white text-center font-bold'>
                                    Ready to lend a hand & help people, dont
                                    miss the opertunity
                                </div>
                                <div className='text-emerald-100 font-medium text-lg bg-gray-900 rounded-md'>
                                    <EventTimer closestEvent={eventDisplay} />
                                </div>
                            </div>
                            <div className='bg-gray-200 bg-opacity-80 w-[100%] h-44 absolute'></div>
                        </div>

                        <div className=' rounded-md mx-8 mb-7 shadow-lg bg-gray-50 absolute -bottom-4 z-10 top-auto h-[15%] justify-center items-center w-[80%] flex flex-row'>
                            <div className='flex flex-row justify-center items-center text-xl font-bold'>
                                {eventDisplay.location.split(" ")[0]}{" "}
                                {eventDisplay.title} event
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row h-[40%]  gap-4 px-4 mt-8'>
                        <div className='w-1/2 flex flex-col'>
                            <div className='ml-2 flex flex-col w-[50%]'>
                                <div className='text-lg font-medium'>
                                    EVENT DISCRIPTION
                                </div>

                                <div className='w-[90%] border-b-4 border-solid border-amber-400'></div>
                            </div>
                            <div className='flex justify-center h-auto text-sm font-serif mt-8'>
                                {eventDisplay.about}
                            </div>
                            <div className='text-center  self-end mt-3 hover:border-none border-green-500 border-2 h-8 hover:bg-amber-400 transition duration-300 font-medium hover:text-white border-solid w-28 rounded-full cursor-pointer '>
                                <JoinButton />
                            </div>
                        </div>
                        <div className=' relative w-1/2 px-3 h-[95%] overflow-hidden flex flex-col justify-start  items-start'>
                            <div
                                className=' absolute z-10 w-[70%] h-[90%] top-0 bg-top bg-cover'
                                style={{
                                    backgroundImage: `url(${eventDisplay.image})`,
                                }}
                            ></div>
                            <div
                                className='absolute left-10 top-16 w-[70%] h-full bg-top bg-cover'
                                style={{
                                    backgroundImage: `url('/images/the one.jpg')`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div>
                        {/* <div>
                        <MdVolunteerActivism />
                        <h1>Became a volunteer if you are motivated & ready to support people and the comunity </h1>
                        </div>
                        <div>
                        <FaWallet />
                        <h1>the quiqest way to make a donation, so you can support people in need</h1>
                        </div>
                        <div>
                        <FaDonate />
                        <h1>start donating </h1>
                        </div> */}
                    </div>
                </div>
                <div className='w-[25%] rounded-md shadow-lg bg-red-200 '>
                    <div>
                        <div>Created By</div>
                        <div></div>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default EventDetails;
