
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIey9kE6GGfQfZrkFn6qdsVMsZt_QwhEw",
  authDomain: "pebble-d419a.firebaseapp.com",
  projectId: "pebble-d419a",
  storageBucket: "pebble-d419a.appspot.com",
  messagingSenderId: "458766123239",
  appId: "1:458766123239:web:5a9791e15c6188e338a242"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)