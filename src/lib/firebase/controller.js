import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    TwitterAuthProvider,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { app } from "./firebase";

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const eventsCollection = collection(firestore, "events"); //Events
export const userCollection = collection(firestore, "users"); //Auth

//the function responsible for creating the enw user document when they sign up
export const createUserDocument = async (userId, userData) => {
    const usersRef = collection(firestore, "users");
    const userDocRef = doc(usersRef, userId);

    try {
        await setDoc(userDocRef, userData);
        // console.log("User document created successfully!");
    } catch (error) {
        // console.error("Error creating user document:", error);
    }
};

//function responsible for updating profile info
export const updateUserDocument = async (userId, userData) => {
    const userRef = doc(userCollection, userId);

    try {
        await updateDoc(userRef, userData);
        console.log("User document updated successfully!");
    } catch (error) {
        console.error("Error updating user document:", error);
    }
};

//function responsible for fetching user Data
export const getUserDocument = async (uid) => {
    const userRef = doc(userCollection, uid);
    const userDoc = await getDoc(userRef);
    return userDoc;
};

//function responsible for fetching event Data
export const getEventDocument = async (id) => {
    const eventRef = doc(eventsCollection, id);
    const eventDoc = await getDoc(eventRef);
    return eventDoc;
};

// Function to update event data
export const updateEventDocument = async (eventId, eventData) => {
    const eventRef = doc(eventsCollection, eventId);

    try {
        await updateDoc(eventRef, eventData);
        console.log("Event document updated successfully!");
    } catch (error) {
        console.error("Error updating event document:", error);
    }
};

// Google Auth

export const googleProvider = new GoogleAuthProvider();

//Facebook Auth

export const facebookProvider = new FacebookAuthProvider();

//TWitter Auth

export const twitterProvider = new TwitterAuthProvider();
