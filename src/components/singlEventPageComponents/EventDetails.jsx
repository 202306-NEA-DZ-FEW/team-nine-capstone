import { arrayRemove, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaMapMarkerAlt,
    FaRegCommentDots,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdClose, MdDateRange, MdMail } from "react-icons/md";

import {
    eventsCollection,
    getEventDocument,
    getUserDocument,
    updateEventDocument,
} from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import SocialShare from "@/components/reusableComponents/SocialShare";

import { useUser } from "@/context/UserContext";

import EventCard from "../eventsPageComponents/EventCard";
import EventsComments from "../eventsPageComponents/EventsComments";
import EventTimer from "../eventsPageComponents/EventTimer";
import JoinButton from "../reusableComponents/JoinButton";
import { formatDate } from "../util/formattedDate";
const itemWidth = 540;

function EventDetails() {
    const [myEvents, setMyEvents] = useState([]);
    const [eventDisplay, setEventDisplay] = useState({});
    const [userDetails, setUserDetails] = useState(null);
    const [isDiscription, setIsDescription] = useState(true);
    const [isOrgenizer, setIsOrgebizer] = useState(false);
    const [isDetails, setIsDetails] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [joinUpdate, setJoinUpdate] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [userDoc, setUserDoc] = useState(null);
    const [isComments, setIsComments] = useState(false);
    const [singleEventData, setSingleEventData] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [commentId, setCommentId] = useState(null);
    // const [comment, setComment]

    // const [containerWidth, setContainerWidth] = useState(1800);
    const { user } = useUser();
    console.log("userrrrsingleEventData", singleEventData);
    const containerRef = useRef();
    // function to handle scrolling
    const handleScrolling = (scrollAmount) => {
        const newScrollPosition = Math.max(
            0,
            Math.min(scrollPosition + scrollAmount, 1800)
        );
        setScrollPosition(newScrollPosition);
        containerRef.current.scrollLeft = newScrollPosition;
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const { t } = useTranslation("common");
    const router = useRouter();
    const { id } = router.query;

    // console.log("queyId", id);
    const [currentEventId, setCurrentEventId] = useState(id);
    // console.log("currentid", currentEventId);
    // // console.log("id", id);
    console.log("eventData", eventDisplay.comments);

    // console.log("userData", userDetails);
    // console.log("interests", userDetails?.userInterests);
    const formattedDate = formatDate(eventDisplay?.date, t);
    console.log("allevents", allEvents);
    // const { user, setUser } = useUser();
    // attendees data
    const fetchData = async () => {
        try {
            // Fetch event data
            const eventDoc = await getEventDocument(id);
            if (eventDoc.exists) {
                console.log("im eventdoc");
                setEventDisplay(eventDoc.data());
                // Extract userId from event data
                const userId = eventDoc.data()?.createdBy;
                console.log("userid inside", userId);

                // Fetch user data for the event creator
                const userDoc = await getUserDocument(userId);
                console.log("userdoooc", userDoc.data());

                if (userDoc.exists) {
                    console.log("im usrdoc");
                    setUserDetails(userDoc.data());
                    console.log("inside", userDetails);
                }

                // Fetch user data for each attendee
                const attendeeIds = eventDoc.data()?.attendees || [];
                const attendeesData = await Promise.all(
                    attendeeIds.map(async (attendeeId) => {
                        const attendeeDoc = await getUserDocument(attendeeId);
                        return attendeeDoc.exists
                            ? { ...attendeeDoc.data(), id: attendeeId }
                            : null;
                    })
                );

                console.log("attendeesData", attendeesData);

                // Set the attendees state
                setAttendees(attendeesData.filter(Boolean));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentEventId]);
    const fetchUserDocument = async () => {
        const doc = await getUserDocument(user.uid);
        if (doc.exists()) {
            setUserDoc({ ...doc.data(), id: doc.id });
        } else {
            // Handle the case where the document doesn't exist
            setUserDoc(null);
        }
    };

    useEffect(() => {
        if (user && user.uid) {
            fetchUserDocument();
        }
    }, [user]);
    console.log("userDoc", userDoc);
    // filter the event category
    const matchingInterests = eventDisplay?.interests
        ?.map((element) =>
            interestList.find((interest) => interest.title === element)
        )
        .filter((matchingInterest) => matchingInterest);
    // fetch all the events to filter by cetegory
    useEffect(() => {
        const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
            let eventsArr = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            setAllEvents(eventsArr); // Set loading to false when data is fetched

            // Fetch and set single event data using the currentEventId
            const currentEvent = eventsArr.find(
                (event) => event.id === currentEventId
            );
            if (currentEvent) {
                setSingleEventData(currentEvent);
            } else {
                // Handle the case where the document doesn't exist
                setSingleEventData(null); // You can adjust this based on your requirements
            }
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, [currentEventId]);
    // fetch single event data to use n
    const handleDeleteComment = async (commentId) => {
        console.log("iminsidehandlecomment", commentId);
        await updateEventDocument(currentEventId, {
            comments: arrayRemove(
                singleEventData.comments.find(
                    (comment) => comment.commentId === commentId
                )
            ),
        });
    };
    // filter event by category to put related events
    function filterEventsByCategory(currentEvent, allEvents) {
        // Check if currentEvent or allEvents is undefined or null
        if (!currentEvent || !allEvents) {
            return [];
        }

        const currentEventInterests = currentEvent.interests || [];

        // Filter events that have at least one common interest with the current event
        const filteredEvents = allEvents.filter((event) => {
            const eventInterests = event.interests || [];

            // Check if there's at least one common interest (case-insensitive)
            return currentEventInterests.some((interest) =>
                eventInterests.some(
                    (eventInterest) =>
                        interest.toLowerCase() ===
                            eventInterest.toLowerCase() && event.id !== id
                )
            );
        });

        // Check if the currentEvent is not already in the filteredEvents array

        return filteredEvents;
    }
    const filteredEvents = filterEventsByCategory(eventDisplay, allEvents);
    console.log("Filtered Events:", filteredEvents);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch event data
                const eventDoc = await getEventDocument(id);
                if (eventDoc.exists) {
                    console.log("im eventdoc");
                    setEventDisplay(eventDoc.data());
                    // Extract userId from event data
                    const userId = eventDoc.data()?.createdBy;
                    console.log("userid inside", userId);

                    // Fetch user data
                    const userDoc = await getUserDocument(userId);
                    console.log("userdoooc", userDoc.data());

                    if (userDoc.exists) {
                        console.log("im usrdoc");
                        setUserDetails(userDoc.data());
                        console.log("inside", userDetails);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentEventId, id, user]);

    return (
        <div className='relative flex flex-col  bg-gray-200 h-auto w-full'>
            {/* <div className='z-40 left-16 top-[50%] sticky'>
                <SocialShare
                    path={router.asPath}
                    title={eventDisplay.title}
                    quote={eventDisplay.about}
                />
            </div> */}
            <div className='relative flex pt-3 h-auto gap-4 px-5 bg-gray-200'>
                <div className='w-[100%]  rounded-lg shadow-lg bg-gray-50  h-auto'>
                    <div className='relative w-full h-[80vh] group transition overflow-hidden rounded-lg flex flex-col justify-center  items-center'>
                        <div
                            className='w-full h-[90%] absolute top-0 bg-top bg-cover'
                            style={{
                                backgroundImage: `url(${eventDisplay.image})`,
                                // backgroundSize: "100%", // or "cover", "50%", etc. based on your preference
                                // backgroundPosition: "center",
                                // backgroundRepeat: "no-repeat",
                            }}
                        >
                            {user && user.uid === eventDisplay.createdBy && (
                                <Link href={`/events/editTheEvent/${id}`}>
                                    <div className='absolute z-10 top-1 right-1 rounded-sm p-2 px-2 opacity-100 group-hover:opacity-0 bg-gray-200'>
                                        {/* <MdEdit className='absolute z-20 top-1 bg-gray-200 rounded-full hover:hidden right-2' /> */}
                                        <div className='flex items-center justify-center w-28 h-6  rounded-full'>
                                            EDIT EVENT
                                        </div>
                                    </div>
                                </Link>
                            )}
                            <div className='bg-black bg-opacity-60 w-full h-full absolute'></div>
                        </div>
                        <div className='relative absolut z-10 w-[80%] md:h-[50%] h-[70%] '>
                            <div className='absolute z-10 w-full flex justify-center gap-3 my-3 items-center flex-col'>
                                <div className=' lg:text-3xl md:text-2xl text-xl text-white text-center  font-bold'>
                                    Ready to lend a hand & help people, dont
                                    miss the opertunity
                                </div>
                                <div className='text-emerald-100 font-medium text-lg  rounded-md'>
                                    <EventTimer closestEvent={eventDisplay} />
                                </div>
                                <div className='flex md:flex-row flex-col justify-center lg:w-[40%] items-center h-auto'>
                                    <div className='text-white font-semibold justify-center text-lg items-center gap-2 flex flex-row w-full  lg:w-1/3'>
                                        <MdDateRange /> {formattedDate}
                                    </div>
                                    <div className='text-white font-semibold  justify-center items-center text-lg gap-2 flex flex-row w-full  lg:w-1/3'>
                                        <FaMapMarkerAlt />{" "}
                                        {eventDisplay.location?.split(" ")[0]}
                                    </div>
                                    <div className='text-white font-semibold  justify-center items-center text-lg gap-2 flex flex-row w-full  lg:w-1/3'>
                                        <div>
                                            <FaPeopleGroup />
                                        </div>
                                        {eventDisplay.attendees?.length}{" "}
                                        {t("eventCard.attendees")}
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-900 bg-opacity-80 w-[100%] h-full absolute'></div>
                        </div>

                        <div className=' rounded-md mx-8 mb-7 px-2 shadow-lg bg-gray-50 absolute lg:-bottom-4 -bottom-2 z-10 top-auto lg:h-[15%] h-[10%] justify-center items-center w-[80%] flex flex-row'>
                            <div className='flex flex-row justify-center items-center lg:text-xl text-lg font-bold'>
                                {eventDisplay.location?.split(" ")[0]}{" "}
                                {eventDisplay.title}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row my-3'>
                        <div
                            onClick={() => {
                                setIsDescription(true);
                                setIsOrgebizer(false);
                                setIsDetails(false);
                            }}
                            className='ml-2 flex justify-start flex-col w-1/3 cursor-pointer'
                        >
                            <div className='hover:text-amber-400 scale-110 transition-all lg:text-lg text-sm font-medium px-4'>
                                DISCRIPTION
                            </div>

                            <div
                                className={`${
                                    isDiscription
                                        ? "md:w-[40%] w-full border-b-4 border-solid transition-all scale-x-110 border-amber-400"
                                        : ""
                                }`}
                            ></div>
                        </div>
                        <div
                            onClick={() => {
                                setIsOrgebizer((prev) => !prev);
                                setIsDescription(false);
                                setIsDetails(false);
                            }}
                            className='ml-2 flex flex-col w-1/3 cursor-pointer'
                        >
                            <div className='hover:text-amber-400 scale-110 transition-all lg:text-lg text-sm font-medium px-4'>
                                ORGANIZOR
                            </div>

                            <div
                                className={`${
                                    isOrgenizer
                                        ? "md:w-[40%] w-full border-b-4 border-solid transition-all scale-x-110 border-amber-400"
                                        : ""
                                }`}
                            ></div>
                        </div>
                        <div
                            onClick={() => {
                                setIsDetails(true);
                                setIsOrgebizer(false);
                                setIsDescription(false);
                            }}
                            className='ml-2 flex flex-col w-1/3 cursor-pointer'
                        >
                            <div className='hover:text-amber-400 scale-110 transition-all lg:text-lg text-sm font-medium px-4'>
                                DETAILS
                            </div>

                            <div
                                className={`${
                                    isDetails
                                        ? "md:w-[40%] w-full border-b-4 border-solid transition-all scale-x-110 border-amber-400"
                                        : ""
                                }`}
                            ></div>
                        </div>
                    </div>
                    <div className='h-auto flex justify-center py-3'>
                        <div
                            className={`flex lg:flex-row flex-col justify-center h-[40%] w-[90%] gap-4 px-4 mt-8 ${
                                isDiscription ? "" : "hidden"
                            }`}
                        >
                            <div className='lg:w-1/2 flex flex-col items-start w-full'>
                                <div className='flex justify-center h-auto md:text-lg font-serif '>
                                    {eventDisplay.about}
                                </div>

                                <div className='text-center  self-center mt-3 hover:border-none border-amber-400 border-2 h-8 hover:bg-green-500 transition duration-300 font-medium hover:text-white lg:text-xl text-lg  border-solid w-[40%] rounded-full cursor-pointer '>
                                    <JoinButton
                                        eOwner={eventDisplay.createdBy}
                                        eventId={id}
                                        eAttendees={eventDisplay.attendees}
                                        setJoinUpdate={setJoinUpdate}
                                    />
                                </div>
                                <div className='relative text-center self-center mt-3 border-bgc-sunflower border-2 h-8 hover:bg-bgc-ForestGreen transition duration-300 font-medium hover:text-txtc-Ivory lg:text-xl text-lg border-solid w-[40%] rounded-full cursor-pointer '>
                                    <div onClick={toggleDropdown}>
                                        <button>Share</button>
                                    </div>

                                    {isDropdownOpen && (
                                        <div className='absolute z-10 top-10 right-0 bg-bgc-silver p-2 rounded-full shadow-md'>
                                            <SocialShare
                                                path={router.asPath}
                                                title={eventDisplay.title}
                                                quote={eventDisplay.about}
                                                closeDropdown={closeDropdown}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='hidden  relative lg:w-1/2 px-3 h-auto overflow-hidden lg:flex flex-col justify-start  items-start'>
                                <div
                                    className=' absolute z-10 w-[70%] h-[90%] top-0 bg-top bg-cover'
                                    style={{
                                        backgroundImage: `url(${eventDisplay.image})`,
                                    }}
                                ></div>
                                <div
                                    className=' absolute left-10 top-16 w-[70%] h-full bg-top bg-cover'
                                    style={{
                                        backgroundImage: `url('/images/the one.jpg')`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div
                            className={`${
                                isOrgenizer
                                    ? " w-[80%] lg:w-[40%] flex flex-col  gap-3"
                                    : "hidden"
                            }`}
                        >
                            <div className='flex flex-col justify-center self-center items-center rounded-md lg:w-[20%] w-[70%] py-2'>
                                <div
                                    className=' w-20 h-20 rounded-md bg-top bg-cover shadow-2xl '
                                    style={{
                                        backgroundImage: `url(${userDetails?.avatar})`,
                                    }}
                                ></div>
                                <div className='font-medium'>
                                    {userDetails?.displayName}
                                </div>
                            </div>
                            <div className='flex flex-col px-2 lg:px-28  justify-start items-center gap-2 font-medium text-lg'>
                                <div className='text-lg font-bold felx flex-row gap-2'>
                                    CONTACTS:
                                </div>
                                <div className=' flex flex-row px-2 lg:justify-start justify-center items-center gap-2 font-medium text-lg'>
                                    <MdMail className='text-gray-900' />{" "}
                                    {userDetails?.email}
                                </div>
                                <div className=' flex flex-row px-2 lg:justify-start justify-center items-center gap-2  font-medium text-lg'>
                                    <FaMapMarkerAlt className='text-gray-900' />
                                    {userDetails?.location}
                                </div>
                            </div>

                            <div className='flex flex-col px-2 justify-start items-center gap-2 font-medium text-lg'>
                                <div className='text-lg font-bold felx flex-row gap-2'>
                                    <div>Interests :</div>
                                </div>
                                <div className='flex lg:flex-row flex-col gap-2'>
                                    {userDetails?.userInterests?.map(
                                        (interest) => (
                                            <div
                                                key={interest.id}
                                                className='rounded-full turnicate bg-gray-200 px-2'
                                            >
                                                {interest}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${
                                isDetails
                                    ? " w-[90%] flex flex-row justify-end "
                                    : "hidden"
                            }`}
                        >
                            <div className='flex flex-col w-full md:w-[50%] gap-3'>
                                <div className='flex flex-col px-2  justify-start items-center gap-2 font-medium text-lg'>
                                    {" "}
                                    <div className='text-lg  w-full font-bold'>
                                        TITLE :
                                    </div>
                                    <div className='text-lg w-full font-medium'>
                                        {eventDisplay.title?.toUpperCase()}
                                    </div>
                                </div>
                                <div className='flex flex-col px-2 justify-start items-center gap-2 font-medium text-lg'>
                                    <div className='text-lg w-full font-bold'>
                                        PLACE :
                                    </div>
                                    <div className=' flex flex-row w-full justify-start items-center gap-2 font-medium text-lg'>
                                        <div className=' flex flex-row justify-start'>
                                            {eventDisplay.location}
                                            <FaMapMarkerAlt />{" "}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col px-2 justify-start items-center gap-2 font-medium text-lg'>
                                    <div className='text-lg w-full font-bold'>
                                        {t("eventCard.attendees")}:
                                    </div>
                                    <div className='flex flex-row w-full px-2 justify-start items-center gap-2 font-medium text-lg'>
                                        {attendees?.map((attendee) => (
                                            <Link
                                                key={attendee.id} // Add a unique key for each element in the array
                                                className='w-12 h-12 rounded-full bg-top bg-cover shadow-2xl'
                                                style={{
                                                    backgroundImage: `url(${attendee.avatar})`,
                                                }}
                                                href={`/profile/${attendee.id}`}
                                            ></Link>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col px-2 justify-start items-center gap-2 font-medium text-lg'>
                                    <div className='text-lg w-full font-bold'>
                                        CATEGORY :
                                    </div>
                                    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full place-content-start justify-items-center gap-3'>
                                        {matchingInterests?.map((interest) => (
                                            <div
                                                className='bg-gray-200 flex space-x-1 px-1 items-center gap-1 h-8 w-28 rounded-full'
                                                key={interest.title}
                                            >
                                                <div
                                                    className={` rounded-full h-5 w-5  flex justify-center items-center bg-gray-50  `}
                                                >
                                                    {interest.icon}
                                                </div>
                                                <div
                                                    className='flex justify-start font-medium text-sm items-center truncate h-5'
                                                    key={interest.title}
                                                >
                                                    {t(
                                                        interest.title.toString()
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-auto'>
                        <div className='w-[100%] self-center bg-amber-400 h-2  rounded-full my-4'></div>
                        <div className='flex flex-col gap-4 w-full'>
                            <div
                                className={`${
                                    isComments
                                        ? "bg-gray-200 max-h-56 w-full flex flex-col overflow-hidden overflow-y-auto gap-1 px-2"
                                        : "hidden"
                                }`}
                            >
                                {singleEventData?.comments?.map((comment) => (
                                    <div
                                        key={comment.userUid}
                                        className='bg-gray-200 gap-2 w-full h-auto my-2 flex flex-row justify-start items-start'
                                    >
                                        <div className='w-auto'>
                                            <Link
                                                href={`/profile/${comment.userUid}`}
                                            >
                                                <div
                                                    className='w-12 h-12 rounded-full bg-top bg-cover shadow-2xl '
                                                    style={{
                                                        backgroundImage: `url(${comment?.userAvatar})`,
                                                        backgroundSize: "100%", // or "cover", "50%", etc. based on your preference
                                                        // backgroundPosition:
                                                        //     "center",
                                                        // backgroundRepeat:
                                                        //     "no-repeat",
                                                    }}
                                                ></div>
                                            </Link>
                                        </div>
                                        <div className='relative min-h-[50px] w-96 group transition  bg-gray-50 text-sm font-medium shadow-lg flex flex-wrap whitespace-normal border border-gray-900 border-solid rounded-md justify-start items-center p-2'>
                                            {user?.uid === comment.userUid ? (
                                                <MdClose
                                                    onClick={() =>
                                                        handleDeleteComment(
                                                            comment.commentId
                                                        )
                                                    }
                                                    className='absolute -top-2 right-0 rounded-bl-md text-lg group-hover:flex hidden transition-all cursor-pointer bg-gray-200 shadow-lg '
                                                />
                                            ) : (
                                                ""
                                            )}{" "}
                                            {comment.comment}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {user ? (
                                <div className='flex flex-row w-full mt-2 gap-2 px-2 h-16'>
                                    <Link
                                        className='w-12 h-12 rounded-full bg-top bg-cover shadow-2xl '
                                        href={`/profile/${userDoc?.id}`}
                                        style={{
                                            backgroundImage: `url(${userDoc?.avatar})`,
                                            backgroundSize: "100%", // or "cover", "50%", etc. based on your preference
                                        }}
                                    ></Link>
                                    {/* <div
                                        className='w-12 h-12 rounded-full bg-top bg-cover shadow-2xl '
                                        style={{
                                            backgroundImage: `url(${userDoc?.avatar})`,
                                            backgroundSize: "100%",
                                        }}
                                    ></div> */}

                                    <div className='bg-gray-200 h-12 rounded-full w-full flex justify-start items-center'>
                                        <EventsComments
                                            commentId={commentId}
                                            singleEventData={singleEventData}
                                            isDeleted={isDeleted}
                                            userDoc={userDoc}
                                            eventId={currentEventId}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='bg-gray-200 h-12 self-center px-3 my-2 mx-2 font-medium rounded-full w-full flex justify-start items-center'>
                                    YOU CAN COMMENT WHEN YOU ARE LOGGED IN
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setIsComments(!isComments)}
                    className='bg-gray-50 cursor-pointer  absolute z-20 hover:bg-amber-400 transition-all duration-300 -bottom-8 px-2 right-8 h-8 flex flex-row gap-2 items-center justify-center font-medium w-auto rounded-b-md'
                >
                    <FaRegCommentDots />{" "}
                    <div>
                        {singleEventData?.comments.length === 0
                            ? "NO COMMENTS YET"
                            : isComments
                            ? "HIDE COMMENTS"
                            : "SEE COMMENTS"}
                    </div>
                </div>
            </div>
            <div className=' mt-8'>
                <div className='relative w-full mt-3 '>
                    <div className='bg-amber-400 absolute z-20 -top-8 px-2 left-7 h-8 flex items-center justify-center font-medium w-auto rounded-t-md'>
                        RELATED EVENTS
                    </div>
                    <div
                        onClick={() => {
                            handleScrolling(itemWidth);
                        }}
                        className='absolute right-0 h-[95%] w-12 flex justify-center items-center text-xl bg-white hover:bg-gray-200 rounded-tr-md rounded-br-md opacity-75 text-black hover:text-green-500  z-10'
                    >
                        <FaArrowRight />
                    </div>
                    <div
                        onClick={() => {
                            handleScrolling(-itemWidth);
                        }}
                        className='absolute left-5 h-[95%] w-12 flex justify-center items-center text-xl bg-white hover:bg-gray-200 rounded-tl-md rounded-bl-md opacity-75 text-black hover:text-green-500  z-10'
                    >
                        <FaArrowLeft />
                    </div>
                    <div
                        ref={containerRef}
                        style={{
                            width: "100%",
                            overflowX: "scroll",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "thin",
                        }}
                    >
                        <div className='w-[1800px] mx-5 rounded-md shadow-md flex flex-row items-center gap-3 bg-gray-50'>
                            {filteredEvents.splice(0, 3).map((event) => (
                                <div className='w-[30%]' key={event.id}>
                                    <EventCard TheEvent={event.id} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
