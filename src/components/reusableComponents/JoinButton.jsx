import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

import {
    updateEventDocument,
    updateUserDocument,
} from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

function JoinButton({ eventId, eAttendees, setJoinUpdate }) {
    const { t } = useTranslation("common");
    const { user } = useUser();
    const router = useRouter();

    const handleJoin = async () => {
        if (!user) {
            router.push("/authentication/signUp");
        } else {
            // Update event document
            if (eAttendees.includes(user.uid)) {
                // User is in attendees list - remove them
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

        // Update local state
        setJoinUpdate((prev) => prev + 1);
    };

    return (
        <div onClick={handleJoin}>
            {user
                ? eAttendees.includes(user.uid)
                    ? t("joinbtn.joined")
                    : t("joinbtn.join")
                : t("joinbtn.Sign Up")}
        </div>
    );
}

export default JoinButton;
