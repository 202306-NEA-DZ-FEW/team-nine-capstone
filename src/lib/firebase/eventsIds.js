import { getDocs } from "firebase/firestore";

import { eventsCollection } from "./controller";

export const getAllEventIds = async () => {
    try {
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventIds = [];

        eventsSnapshot.forEach((doc) => {
            const id = doc.id;
            eventIds.push({
                params: {
                    id: id,
                },
            });
        });

        return eventIds;
    } catch (error) {
        console.error("Error fetching event IDs from Firebase:", error);
        return [];
    }
};
