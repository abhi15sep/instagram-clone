import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyBY-5ZKGM0aH3Dv9qiwS03CSUzkrn7nK60',
    authDomain: "instagram-clone-84853.firebaseapp.com",
    databaseURL: 'https://instagram-clone-84853.firebaseio.com',
    projectId: "instagram-clone-84853",
    storageBucket: 'instagram-clone-84853.appspot.com',
    messagingSenderId: "853963345898",
    appId: "1:853963345898:web:4c91c13c02a62898862c93",
    measurementId: "G-4DF9348JTY"
});

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}