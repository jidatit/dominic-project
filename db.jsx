import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9EoYEW4q-CuhX3j-kz6pVwTwhJhxfyRk",
  authDomain: "dominic-project-30d16.firebaseapp.com",
  projectId: "dominic-project-30d16",
  storageBucket: "dominic-project-30d16.appspot.com",
  messagingSenderId: "907287468214",
  appId: "1:907287468214:web:b60381281108cefc70ae17"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);