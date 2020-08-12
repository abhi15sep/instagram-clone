import firebase from 'firebase'
import {API_KEY, DATABASE, STORAGE} from './note.js'

const firebaseApp = firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: "instagram-clone-84853.firebaseapp.com",
    databaseURL: DATABASE,
    projectId: "instagram-clone-84853",
    storageBucket: STORAGE,
    messagingSenderId: "853963345898",
    appId: "1:853963345898:web:4c91c13c02a62898862c93",
    measurementId: "G-4DF9348JTY"
});

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}