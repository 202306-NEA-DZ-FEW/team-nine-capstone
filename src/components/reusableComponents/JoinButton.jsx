import { arrayRemove, arrayUnion } from "firebase/firestore";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import {
    updateEventDocument,
    updateUserDocument,
} from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function JoinButton({ eOwner, eventId, eAttendees, setJoinUpdate }) {
    const { t } = useTranslation("common");
    const { user } = useUser();
    const [isEventOwner, setIsEventOwner] = useState(false);

    useEffect(() => {
        const findIfOwner = () => {
            if (user && user.uid === eOwner) {
                setIsEventOwner(true);
            } else {
                setIsEventOwner(false);
            }
        };

        findIfOwner();
    }, [user, eOwner]);

    const handleJoin = async () => {
        if (!user) {
            /* Handle case when user is not logged in */
        } else if (isEventOwner === true) {
            /* Handle case when user is the event owner */
        } else {
            const attendeesArray = eAttendees || [];
            if (attendeesArray.includes(user.uid)) {
                await updateEventDocument(eventId, {
                    attendees: arrayRemove(user.uid),
                });
                await updateUserDocument(user.uid, {
                    iEvents: arrayRemove(eventId),
                });
            } else {
                // User is not in attendees list - add them
                await updateEventDocument(eventId, {
                    attendees: arrayUnion(user.uid),
                });
                // Event is not in user's events list - add it
                await updateUserDocument(user.uid, {
                    iEvents: arrayUnion(eventId),
                });
            }
        }

        setJoinUpdate((prev) => prev + 1);
    };

    return (
        <div onClick={handleJoin}>
            {user ? (
                isEventOwner ? (
                    <Link href={`/events/editTheEvent/${eventId}`}>
                        {t("joinbtn.editEvent")}
                    </Link>
                ) : eAttendees?.includes(user.uid) ? (
                    t("joinbtn.joined")
                ) : (
                    t("joinbtn.join")
                )
            ) : (
                <Link href='authetication/signUp'>{t("joinbtn.signUp")}</Link>
            )}
        </div>
    );
}

export default JoinButton;
