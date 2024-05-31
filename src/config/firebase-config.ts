import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCinrZtJjADsvJ0eVlXxFawLnqB-cb9iXY",
    authDomain: "sistemadeclassificacaodeeviden.firebaseapp.com",
    projectId: "sistemadeclassificacaodeeviden",
    storageBucket: "sistemadeclassificacaodeeviden.appspot.com",
    messagingSenderId: "114756691894",
    appId: "1:114756691894:web:1bf15c3f02b672a4cf4317",
    measurementId: "G-LSJ37Q7103"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();