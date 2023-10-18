import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

import { app } from "./firebase";

export const firestore = getFirestore(app);
export const auth = getAuth(app);

//Events

export const eventsCollection = collection(firestore, "events");

//Auth
