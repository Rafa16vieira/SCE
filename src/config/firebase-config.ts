import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const firebaseConfig = {
    apiKey: "AIzaSyCinrZtJjADsvJ0eVlXxFawLnqB-cb9iXY",
    authDomain: "sistemadeclassificacaodeeviden.firebaseapp.com",
    projectId: "sistemadeclassificacaodeeviden",
    storageBucket: "sistemadeclassificacaodeeviden.appspot.com",
    messagingSenderId: "114756691894",
    appId: "1:114756691894:web:1bf15c3f02b672a4cf4317",
    measurementId: "G-LSJ37Q7103"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage)})
const firestore = getFirestore(app);

export { auth, firestore };