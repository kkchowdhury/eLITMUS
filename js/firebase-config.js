import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from "@firebase/firestore";
import {
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVKzyN7z33KvYnvL7Nno1LaYXDd7tZeM4",
    authDomain: "time-portal-tva.firebaseapp.com",
    projectId: "time-portal-tva",
    storageBucket: "time-portal-tva.appspot.com",
    messagingSenderId: "1077030926852",
    appId: "1:1077030926852:web:d61c03add5eff1c5a89351",
    measurementId: "G-ZW0MD3MFNG",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);