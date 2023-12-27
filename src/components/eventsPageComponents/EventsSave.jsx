import { arrayRemove, arrayUnion } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { updateUserDocument } from "@/lib/firebase/controller";

const EventsSave = ({ userDoc, eventId }) => {
    const [eventsSave, setEventsSave] = useState([]);

    useEffect(() => {
        if (userDoc && userDoc.eventsSave) {
            setEventsSave(userDoc.eventsSave);
        } else {
            setEventsSave([]);
        }
    }, [userDoc]);

    const handleSave = async () => {
        if (eventsSave.includes(eventId)) {
            await updateUserDocument(userDoc.id, {
                eventsSave: arrayRemove(eventId),
            });
            setEventsSave((prevEventsSave) =>
                prevEventsSave.filter((id) => id !== eventId)
            );
        } else {
            await updateUserDocument(userDoc.id, {
                eventsSave: arrayUnion(eventId),
            });
            setEventsSave((prevEventsSave) => [...prevEventsSave, eventId]);
        }
    };

    return (
        <div className='cursor-pointer' onClick={handleSave}>
            {eventsSave.includes(eventId) ? (
                <div className='text-amber-400'>
                    <FaBookmark />
                </div>
            ) : (
                <div className='text-gray-950'>
                    <FaRegBookmark />
                </div>
            )}
        </div>
    );
};

export default EventsSave;
