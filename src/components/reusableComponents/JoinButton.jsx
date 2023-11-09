import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
    getUserDocument,
    updateEventDocument,
    updateUserDocument,
} from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function JoinButton({ eventId, eAttendees }) {
    const { t } = useTranslation("common");
    const { user } = useUser();
    const [userData, setUserData] = useState();
    const [userEvents, setUserEvents] = useState([]);
    const router = useRouter();
    const [included, setIncluded] = useState(false);

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
                console.error("Error fetching user data:", error);
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
                console.log("removed");
                setIncluded(false);
            } else {
                // User is not in attendees list - add them
                updatedAttendees.push(user.uid);
                setIncluded(true);
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
        }
    };

    return (
        <div onClick={handleJoinClick}>
            {user ? (included ? t("Joined") : t("Join")) : t("Sign Up")}
        </div>
    );
}

export default JoinButton;
