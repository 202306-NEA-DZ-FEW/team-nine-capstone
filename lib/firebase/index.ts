
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  // "place firebase config file here"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)