import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "instagram-clone-84853.firebaseapp.com",
    databaseURL: process.env.REACT_APP_DATABASE,
    projectId: "instagram-clone-84853",
    storageBucket: process.env.REACT_APP_STORAGE,
    messagingSenderId: "853963345898",
    appId: "1:853963345898:web:4c91c13c02a62898862c93",
    measurementId: "G-4DF9348JTY"
});

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}