import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC36W1zLdv-lC05bW7S0JH7IAXdwETOjnE",
  authDomain: "megasails-1302.firebaseapp.com",
  databaseURL: "https://megasails-1302-default-rtdb.firebaseio.com",
  projectId: "megasails-1302",
  storageBucket: "megasails-1302.appspot.com",
  messagingSenderId: "955038394523",
  appId: "1:955038394523:web:968a2b538aef126ba27e3e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const database = getDatabase(app);
