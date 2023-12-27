import { getDocs } from "firebase/firestore";

import { userCollection } from "./controller";

export const getAllUserIds = async () => {
    try {
        const userSnapshot = await getDocs(userCollection);
        const userIds = [];

        userSnapshot.forEach((doc) => {
            const id = doc.id;
            userIds.push({
                params: {
                    id: id,
                },
            });
        });

        return userIds;
    } catch (error) {
        console.error("Error fetching user IDs from Firebase:", error);
        return [];
    }
};
