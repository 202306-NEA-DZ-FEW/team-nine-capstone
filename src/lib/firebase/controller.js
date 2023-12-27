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

export const updateUserDocument = async (userId, userData) => {
    const userRef = doc(userCollection, userId);

    try {
        await updateDoc(userRef, userData);
    } catch (error) {
        error.message;
    }
};

export const getUserDocument = async (uid) => {
    const userRef = doc(userCollection, uid);
    const userDoc = await getDoc(userRef);
    return userDoc;
};

export const getEventDocument = async (id) => {
    const eventRef = doc(eventsCollection, id);
    const eventDoc = await getDoc(eventRef);
    return eventDoc;
};

export const updateEventDocument = async (eventId, eventData) => {
    const eventRef = doc(eventsCollection, eventId);

    try {
        await updateDoc(eventRef, eventData);
    } catch (error) {
        error.message;
    }
};

export const googleProvider = new GoogleAuthProvider();

export const facebookProvider = new FacebookAuthProvider();

export const twitterProvider = new TwitterAuthProvider();
