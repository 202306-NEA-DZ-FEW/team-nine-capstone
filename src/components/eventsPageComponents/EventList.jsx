import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import EventCard from "./EventCard";
import { eventsCollection } from "../../lib/firebase/controller";

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        onSnapshot(eventsCollection, (snapshot) => {
            let eventsArr = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            // console.log("this is our events", eventsArr);
            setEvents(eventsArr);
        });
    }, []);

    return (
        <div>
            <h1 className='mx-auto bg-gray-500 font-bold text-3xl flex items-center py-12 justify-center'>
                Our Events
            </h1>
            {events.map((event) => {
                return <EventCard key={event.id} TheEvent={event} />;
            })}
        </div>
    );
}

export default EventList;
