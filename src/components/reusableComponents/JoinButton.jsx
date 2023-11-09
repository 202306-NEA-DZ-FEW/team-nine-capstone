import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import {
    getUserDocument,
    updateEventDocument,
    updateUserDocument,
} from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function JoinButton({ eventId, eAttendees, setJoinUpdate }) {
    const { t } = useTranslation("common");
    const { user } = useUser();
    const [userData, setUserData] = useState();
    const [userEvents, setUserEvents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getUserDocument(user.uid);
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setUserData(userData);
                    setUserEvents(userData.iEvents);
                }
            } catch (error) {
                error;
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleJoinClick = async () => {
        if (!user) {
            router.push("/authentication/signUp");
        } else {
            const updatedUserData = { ...userData };
            let updatedAttendees = Array.isArray(eAttendees)
                ? [...eAttendees]
                : [];

            if (updatedAttendees.includes(user.uid)) {
                // User is in attendees list - remove them
                updatedAttendees = updatedAttendees.filter(
                    (attendee) => attendee !== user.uid
                );
            } else {
                // User is not in attendees list - add them
                updatedAttendees.push(user.uid);
            }

            const updatedEventData = {
                attendees: updatedAttendees,
            };
            updateEventDocument(eventId, updatedEventData);

            // Update the user's events list
            if (!updatedUserData.iEvents.includes(eventId)) {
                updatedUserData.iEvents = [...updatedUserData.iEvents, eventId];
            } else {
                updatedUserData.iEvents = updatedUserData.iEvents.filter(
                    (eventIdToRemove) => eventIdToRemove !== eventId
                );
            }

            await updateUserDocument(user.uid, updatedUserData);

            setUserEvents(updatedUserData.iEvents);
            setJoinUpdate((prev) => prev + 1);
        }
    };

    return (
        <div onClick={handleJoinClick}>
            {user
                ? eAttendees.includes(user.uid)
                    ? t("joinbtn.joined")
                    : t("joinbtn.join")
                : t("joinbtn.Sign Up")}
        </div>
    );
}

export default JoinButton;
