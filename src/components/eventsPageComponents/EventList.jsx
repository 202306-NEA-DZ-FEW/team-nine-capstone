import { onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { LuFilterX } from "react-icons/lu";

import { eventsCollection } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

import DateFilter from "./DateFilter";
import EventCard from "./EventCard";
import InterestsFilter from "./InterestsFilter";
import LocatioFilter from "./LocatioFilter";

function EventList() {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState(null);
    const [upDatedDate, setUpDatedDated] = useState(null);
    const [allCategories, setAllCategoris] = useState(null);
    const [updatedInterests, setUpdatedInterests] = useState([]);
    const [prevLocation, setPrevLocation] = useState(null);
    const [isReset, setIsReset] = useState(false);
    // // console.log({ date, location, updatedInterests });
    // console.log(events);
    // console.log(updatedInterests);
    console.log(location);
    const { user } = useUser();
    const router = useRouter();

    // sets the routing according to the user's state
    const handleUser = () => {
        user
            ? router.push("/createEvent")
            : router.push("/authentication/signUp");
    };

    // const handleAllCategories = () => {
    //     setAllCategoris("all");
    // };
    let filteredEvents = events; // Initialize with all events

    // if (!allCategories) {
    //     // Apply the category filter
    //     filteredEvents = filteredEvents.filter((e) =>
    //         updatedInterests.length === 0
    //             ? true
    //             : updatedInterests.includes(e.interest)
    //     );
    // }

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

    useEffect(() => {
        onSnapshot(eventsCollection, (snapshot) => {
            let eventsArr = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            setEvents(eventsArr);
        });
    }, []);

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col w-1/3 gap-4'>
                {/* reset filter button */}
                <div
                    className='flex flex-row mt-3 justify-center transition-all h-11 duration-150 text-lg font-medium cursor-pointer items-center w-[90%] self-center border-spacing-1 rounded-sm border-solid hover:bg-red-700 hover:text-white active:text-white border-black shadow-lg'
                    onClick={() => resetFilter()}
                >
                    Clear Filters <LuFilterX />
                </div>
                {/* calendar filter component */}
                <div>
                    <DateFilter upDatedDate={upDatedDate} onClick={onClick} />
                </div>
                <div class='w-[90%] self-center border-b-2 border-black my-4'></div>
                <div>
                    {/* locations components filter */}
                    <LocatioFilter
                        prevLocation={prevLocation}
                        setPrevLocation={setPrevLocation}
                        setLocation={setLocation}
                        location={location}
                        events={events}
                        handleLocation={handleLocation}
                    />
                </div>
                <div class='w-[90%] self-center border-b-2 border-black my-4'></div>
                <div>
                    <InterestsFilter
                        allCategories={allCategories}
                        setAllCategoris={setAllCategoris}
                        setUpdatedInterests={setUpdatedInterests}
                        updatedInterests={updatedInterests}
                        handleInterest={handleInterest}
                    />
                </div>
            </div>
            <div className='w-2/3'>
                {filteredEvents.length !== 0 ? (
                    <h1 className='z-60 mx-auto bg-gray-500 font-bold text-3xl flex items-center py-12 justify-center'>
                        {t("Our Events")}
                    </h1>
                ) : (
                    <p className='z-60 mx-auto bg-gray-500 font-bold text-3xl flex items-center py-12 justify-center'>
                        {t("No Events")}
                    </p>
                )}
                {/* display the events based on filters */}
                {filteredEvents.length !== 0 ? (
                    filteredEvents.map((event) => {
                        return <EventCard key={event.id} TheEvent={event} />;
                    })
                ) : (
                    <button
                        className='w-full h-14 border rounded-lg my-2 text-lg flex flex-row justify-center items-center bg-amber-500 cursor-pointer hover:bg-teal-600 transition-all duration-200'
                        onClick={handleUser}
                    >
                        {t("Create Event")}
                    </button>
                )}
            </div>
        </div>
    );
}

export default EventList;
