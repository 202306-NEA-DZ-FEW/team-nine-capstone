import { onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";
import { LuFilterX } from "react-icons/lu";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { eventsCollection } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import { useUser } from "@/context/UserContext";

import BottomSheet from "./BottomSheets";
import DateFilter from "./DateFilter";
import EventCard from "./EventCard";
import InterestsFilter from "./InterestsFilter";
import LocatioFilter from "./LocatioFilter";
import Pagination from "./Pagination";

function EventList() {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState(null);
    const [upDatedDate, setUpDatedDated] = useState(null);
    const [allCategories, setAllCategoris] = useState(false);
    const [updatedInterests, setUpdatedInterests] = useState([]);
    const [prevLocation, setPrevLocation] = useState(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [filterType, setFilterType] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [locationSearch, setLocationSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;
    const { user } = useUser();
    const router = useRouter();
    const closestEvent = events.reduce((closest, event) => {
        const targetDate = new Date(event.date);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;
        // console.log("time diff", timeDifference);

        // Check if this event is closer than the current closest event
        if (
            timeDifference > 0 &&
            (closest === null || timeDifference < closest.timeDifference)
        ) {
            return {
                event,
                targetDate,
            };
        }
        return closest;
    }, null);

    const openBottomSheet = () => {
        setBottomSheetOpen(true);
    };

    const closeBottomSheet = () => {
        setBottomSheetOpen(false);
    };
    const handleFilterType = (filterType) => {
        setFilterType(filterType);
    };

    // sets the routing according to the user's state
    const handleUser = () => {
        user
            ? router.push("/createTheEvent")
            : router.push("/authentication/signUp");
    };

    let filteredEvents = events; // Initialize with all events

    // var to handle translatons
    const { t } = useTranslation();
    // handle reset filter
    const resetFilter = () => {
        setUpdatedInterests([]);
        setLocation(null);
        setUpDatedDated(null);
        setAllCategoris(null);
    };
    // filtered date
    const onClick = (selectedDate) => {
        const formattedDate = selectedDate.format("DD/MM/YYYY");
        if (formattedDate === upDatedDate) {
            setUpDatedDated(null);
        } else {
            setUpDatedDated(formattedDate);
        }
    };
    // function that handle filter the events based on the location choosed by the user
    const handleLocation = (location) => {
        if (location !== prevLocation) {
            setLocation(prevLocation);
        } else {
            setLocation(null);
        }
    };
    // function to handle Interests filter
    const handleInterest = (interest) => {
        // Check if the interest is in the updatedInterests array
        const index = updatedInterests.indexOf(interest);
        if (index === -1) {
            // If the interest is not in the array, add it
            setUpdatedInterests((prevInterests) => [
                ...prevInterests,
                interest,
            ]);
        } else {
            // If the interest is already in the array, remove it
            const updatedInterestsWithoutInterest = updatedInterests.filter(
                (item) => item !== interest
            );
            setUpdatedInterests(updatedInterestsWithoutInterest);
        }
    };

    if (!allCategories) {
        // Apply the category filter
        filteredEvents = filteredEvents.filter((e) => {
            if (updatedInterests.length === 0) {
                return true; // No filters applied if updatedInterests is empty
            } else {
                // Check if any selected interest is included in e.interest
                return updatedInterests.every((selectedInterest) =>
                    e.interests?.includes(selectedInterest)
                );
            }
        });
    }

    // Apply other filters
    filteredEvents = filteredEvents
        .filter((e) =>
            upDatedDate
                ? e.date?.toLowerCase().includes(upDatedDate.toLowerCase())
                : true
        )
        .filter((e) =>
            location
                ? e.location?.toLowerCase().includes(location.toLowerCase())
                : true
        );

    const matchingInterests = updatedInterests
        ?.map((element) =>
            interestList.find((interest) => interest.title === element)
        )
        .filter((matchingInterest) => matchingInterest);
    // fetch the events data
    useEffect(() => {
        const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
            let eventsArr = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            setEvents(eventsArr);
            setLoading(false); // Set loading to false when data is fetched
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []); // The empty dependency array ensures that this effect runs once

    // Render loading state while data is being fetched
    if (loading) {
        return <p>Loading...</p>;
    }
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === "") {
            setLocationSearch([]);
        } else {
            setLocationSearch(
                events
                    .filter((f) =>
                        f.location?.toLowerCase().includes(searchValue)
                    )
                    .map((event) => event.location)
            );
        }
    };

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredEvents.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % filteredEvents.length;
        setItemOffset(newOffset);
    };
    return (
        <div className='relative h-full flex flex-col bg-gray-200'>
            <div className='relative flex md:flex-row py-2 justify-center flex-col md:px-6'>
                <div className='hidden bg-gray-50 mt-4 sticky top-24 rounded-xl shadow-lg md:flex flex-col w-1/4 gap-4  h-[60%]'>
                    {/* reset filter button */}
                    <div
                        className='flex flex-row mt-3 h-auto py-1 justify-between px-1 transition-all duration-150 text-lg bg-gray-200 font-medium cursor-pointer hover:text-white items-center w-auto gap-2 self-center hover:bg-red-500 rounded-full shadow-lg'
                        onClick={() => resetFilter()}
                    >
                        <div className='w-7 h-7 bg-gray-50 rounded-full text-red-500 flex justify-center items-center'>
                            <LuFilterX />
                        </div>
                        <h1 className=''>{t("eventList.Clear Filters")}</h1>{" "}
                    </div>
                    {/* calendar filter component */}
                    <div>
                        <DateFilter
                            upDatedDate={upDatedDate}
                            onClick={onClick}
                        />
                    </div>
                    <div className='w-[90%] self-center bg-gray-200 h-2 rounded-full my-4'></div>
                    <div className=''>
                        {/* locations components filter */}
                        <LocatioFilter
                            setLocationSearch={setLocationSearch}
                            locationSearch={locationSearch}
                            handleSearch={handleSearch}
                            prevLocation={prevLocation}
                            setPrevLocation={setPrevLocation}
                            setLocation={setLocation}
                            location={location}
                            events={events}
                            handleLocation={handleLocation}
                        />
                    </div>
                    <div className='w-[90%] self-center bg-gray-200 h-2 rounded-full my-4'></div>
                    <div className=''>
                        <InterestsFilter
                            allCategories={allCategories}
                            setAllCategoris={setAllCategoris}
                            setUpdatedInterests={setUpdatedInterests}
                            updatedInterests={updatedInterests}
                            handleInterest={handleInterest}
                        />
                    </div>
                    {/* <div>join</div> */}
                </div>

                <div className='md:w-3/4  h-auto flex flex-col gap-2 items-center'>
                    <div className=' border border-solid border-emerald-950 self-center w-[95%] h-44 rounded-xl mx-auto my-4 flex justify-center items-center'>
                        {/* <EventTimer closestEvent={closestEvent} /> */}
                    </div>
                    <button
                        className='w-[90%] h-8 px-1 rounded-full shadow-lg font-medium flex flex-row justify-center items-center hover:bg-amber-400 cursor-pointer bg-teal-600 transition-all duration-200'
                        onClick={handleUser}
                    >
                        {t("Create Event")}
                    </button>
                    {allCategories ? (
                        ""
                    ) : (
                        <div className='hidden lg:grid px-5 lg:grid-cols-5 place-content-start justify-items-start gap-4 h-auto'>
                            {matchingInterests?.map((interest) => (
                                <div
                                    className='bg-gray-50 flex justify-between px-1 items-center gap-1 h-10 w-40 rounded-full shadow-lg '
                                    key={interest.title}
                                >
                                    <div
                                        className={` rounded-full h-7 w-7  flex justify-center items-center bg-gray-200 text-${interest.color}-100 `}
                                    >
                                        {interest.icon}
                                    </div>
                                    <div
                                        className='flex justify-center font-medium text-sm items-center  h-6 rounded-full'
                                        key={interest.title}
                                    >
                                        {t(interest.title.toString())}
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleInterest(interest.title)
                                        }
                                        className='text-lg cursor-pointer'
                                    >
                                        <MdClose />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='flex flex-row w-full px-2 gap-2 mb-5 md:hidden'>
                        <div
                            className='w-[35%] cursor-pointer bg-slate-50 flex justify-center items-center h-9 transition duration-300 hover:bg-amber-400 hover:text-white rounded-lg shadow-lg text-sm font-medium'
                            onClick={() => {
                                handleFilterType("interest");
                                openBottomSheet();
                            }}
                        >
                            {t("eventList.Change interest")}{" "}
                            <div>
                                <MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                        <div
                            className='w-[35%] cursor-pointer bg-slate-50 flex justify-center items-center h-9 transition duration-300 hover:bg-amber-400 hover:text-white rounded-lg shadow-lg text-sm font-medium'
                            onClick={() => {
                                handleFilterType("location");
                                openBottomSheet();
                            }}
                        >
                            {t("eventList.change location")}{" "}
                            <div>
                                <MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                        <div
                            className='w-[35%] cursor-pointer bg-slate-50 flex justify-center items-center h-9 transition duration-300 hover:bg-amber-400 hover:text-white rounded-lg shadow-lg text-sm font-medium'
                            onClick={() => {
                                handleFilterType("date");
                                openBottomSheet();
                            }}
                        >
                            {t("eventList.change date")}{" "}
                            <div className='font-bold text-lg'>
                                <MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                    </div>
                    <div className='h-auto md:w-[95%] bg-gray-50 rounded-xl shadow-xl w-full flex flex-col justify-start items-center '>
                        {/* display the events based on filters */}
                        {currentItems.length !== 0 ? (
                            currentItems.map((event) => {
                                return (
                                    <EventCard
                                        key={event.id}
                                        TheEvent={event.id}
                                    />
                                );
                            })
                        ) : (
                            <div className=' w-full flex h-auto justify-start py-2 flex-row px-2 gap-4 place-content-center'>
                                <h1 className='rounded-full px-2 gap-2 justify-center items-center h-8 w-auto flex flex-row bg-gray-200 font-medium text-lg'>
                                    {t(
                                        "eventList.sorry no event matches your filters"
                                    )}{" "}
                                    <BiSad className='text-yellow-400 text-xl' />
                                </h1>
                            </div>
                        )}
                    </div>
                    {currentItems.length !== 0 ? (
                        <div className='w-[40%] h-12 mt-3 flex bg-gray-50 rounded-xl shadow-lg flex-col justify-center items-center'>
                            <Pagination
                                handlePageClick={handlePageClick}
                                pageCount={pageCount}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <BottomSheet
                    setLocationSearch={setLocationSearch}
                    locationSearch={locationSearch}
                    handleSearch={handleSearch}
                    bottomSheetOpen={bottomSheetOpen}
                    prevLocation={prevLocation}
                    setPrevLocation={setPrevLocation}
                    setLocation={setLocation}
                    location={location}
                    events={events}
                    handleLocation={handleLocation}
                    upDatedDate={upDatedDate}
                    onClick={onClick}
                    filterType={filterType}
                    allCategories={allCategories}
                    setAllCategoris={setAllCategoris}
                    setUpdatedInterests={setUpdatedInterests}
                    updatedInterests={updatedInterests}
                    handleInterest={handleInterest}
                    isOpen={bottomSheetOpen}
                    onClose={closeBottomSheet}
                />
            </div>
        </div>
    );
}

export default EventList;
