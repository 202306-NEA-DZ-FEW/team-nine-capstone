import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { eventsCollection, userCollection } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

import DateFilter from "./DateFilter";
import EventCard from "./EventCard";
import LocatioFilter from "./LocatioFilter";
import Loader from "../loader/Loader";

function IEvent() {
    const [eventsId, setEventsId] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [location, setLocation] = useState(null);
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const handleUser = () => {
        user
            ? router.push("/createTheEvent")
            : router.push("/authentication/signUp");
    };

    const { t } = useTranslation();
    const onClick = (selectedDate) => {
        const formattedDate = selectedDate.format("DD MMM YYYY");
        const filteredEvents = events.filter((event) => {
            return event.date === formattedDate.toLowerCase();
        });
        setFilteredEvents(filteredEvents);
    };

    const handleLocation = (location) => {
        const filteredEvents = events.filter((event) => {
            setLocation(location);
            return event.location === location;
        });
        setFilteredEvents(filteredEvents);
    };

    useEffect(() => {
        if (user && user.uid) {
            const userRef = doc(userCollection, user.uid);

            onSnapshot(userRef, (userDoc) => {
                const userData = userDoc.data();

                if (userData) {
                    setEventsId(userData.iEvents);
                    setLoading(false);
                }

                console.log("eventsId", eventsId);
            });

            onSnapshot(eventsCollection, (snapshot) => {
                const userMyEvents = snapshot.docs.filter((doc) => {
                    return eventsId.includes(doc.id);
                });
                setEvents(userMyEvents);
                setFilteredEvents(userMyEvents);
                console.log("userMyEvents", userMyEvents);
            });
        }
    }, [user]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='flex flex-row'>
            {/* calendar filter component */}
            <div className='flex flex-col w-1/3 gap-3'>
                <div>
                    <DateFilter onClick={onClick} />
                </div>
                <div>
                    {/* locations components filter */}
                    <LocatioFilter
                        location={location}
                        events={events}
                        handleLocation={handleLocation}
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

export default IEvent;
