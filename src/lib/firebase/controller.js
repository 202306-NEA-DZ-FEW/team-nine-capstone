import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

import { app } from "./firebase";

export const firestore = getFirestore(app);
export const auth = getAuth(app);

export const eventsCollection = collection(firestore, "events"); //Events
export const userCollection = collection(firestore, "users"); //Auth

//the function responsible for creating the enw user document when they sign up
export const createUserDocument = async (userId, userData) => {
    const usersRef = collection(firestore, "users");
    const userDocRef = doc(usersRef, userId);

    try {
        await setDoc(userDocRef, userData);
        console.log("User document created successfully!");
    } catch (error) {
        console.error("Error creating user document:", error);
    }
};
