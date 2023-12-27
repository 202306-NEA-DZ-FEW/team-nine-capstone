import { onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";
import { LuFilterX } from "react-icons/lu";
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { eventsCollection } from "@/lib/firebase/controller";
import { interestList } from "@/lib/interestsList";

import Loader from "@/components/loader/Loader";

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

    const openBottomSheet = () => {
        setBottomSheetOpen(true);
    };

    const closeBottomSheet = () => {
        setBottomSheetOpen(false);
    };
    const handleFilterType = (filterType) => {
        setFilterType(filterType);
    };

    const handleUser = () => {
        user
            ? router.push("/createTheEvent")
            : router.push("/authentication/signUp");
    };

    let filteredEvents = events;
    const { t } = useTranslation();

    const resetFilter = () => {
        setUpdatedInterests([]);
        setLocation(null);
        setUpDatedDated(null);
        setAllCategoris(null);
    };

    const onClick = (selectedDate) => {
        const formattedDate = selectedDate.format("DD/MM/YYYY");
        if (formattedDate === upDatedDate) {
            setUpDatedDated(null);
        } else {
            setUpDatedDated(formattedDate);
        }
    };

    const handleLocation = (location) => {
        if (location !== prevLocation) {
            setLocation(prevLocation);
        } else {
            setLocation(null);
        }
    };

    const handleInterest = (interest) => {
        const index = updatedInterests.indexOf(interest);
        if (index === -1) {
            setUpdatedInterests((prevInterests) => [
                ...prevInterests,
                interest,
            ]);
        } else {
            const updatedInterestsWithoutInterest = updatedInterests.filter(
                (item) => item !== interest
            );
            setUpdatedInterests(updatedInterestsWithoutInterest);
        }
    };

    if (!allCategories) {
        filteredEvents = filteredEvents.filter((e) => {
            if (updatedInterests.length === 0) {
                return true;
            } else {
                return updatedInterests.every((selectedInterest) =>
                    e.interests?.includes(selectedInterest)
                );
            }
        });
    }

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

    useEffect(() => {
        const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
            let eventsArr = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            setEvents(eventsArr);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    if (loading) {
        return <Loader />;
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

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % filteredEvents.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <div className='relative h-full flex flex-col bg-gray-200'>
                <div className='relative flex md:flex-row py-2 justify-center flex-col md:px-6'>
                    <div className=' hidden bg-gray-50 mt-4 sticky group transition top-24 rounded-xl shadow-lg md:flex flex-col w-1/4 gap-4  h-[60%]'>
                        <div
                            className='absolute flex flex-row mt-3 -left-28 group-hover:left-2 duration-300 opacity-0 group-hover:opacity-100 h-auto py-1 justify-between px-1 transition-all text-lg bg-gray-200 font-medium cursor-pointer hover:text-white items-center w-auto gap-2 self-center hover:bg-red-500 rounded-full shadow-lg'
                            onClick={() => resetFilter()}
                        >
                            <div className='w-7 h-7 bg-gray-50 rounded-full text-black flex justify-center items-center'>
                                <LuFilterX />
                            </div>
                            <h1 className=''>{t("eventList.Clear Filters")}</h1>{" "}
                        </div>

                        <div className='mt-10'>
                            <DateFilter
                                upDatedDate={upDatedDate}
                                onClick={onClick}
                            />
                        </div>
                        <div className='w-[90%] self-center bg-gray-200 h-2 rounded-full my-4'></div>
                        <div className=''>
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
                    </div>

                    <div className='md:w-3/4  h-auto flex flex-col gap-2 items-center'>
                        <div className=' border border-solid border-emerald-950 self-center w-[92%] h-60 rounded-xl mx-auto my-4 flex justify-center items-center'>
                            <Image
                                src='/images/allEventsBackground.png'
                                alt='construct'
                                width={900}
                                height={900}
                                style={{
                                    objectFit: "fill",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    border: "rounded",
                                }}
                            />
                        </div>
                        <Link
                            className='w-[90%] h-8 px-1 rounded-full shadow-lg font-medium flex flex-row justify-center items-center hover:bg-amber-400 cursor-pointer bg-teal-600 transition-all duration-200'
                            href={
                                user
                                    ? "/createTheEvent"
                                    : "/authentication/signUp"
                            }
                        >
                            {t("Create Event")}
                        </Link>
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
        </>
    );
}

export default EventList;
