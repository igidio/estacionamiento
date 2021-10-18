import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBaEdXpIzEiPWGkLJ0pOLG-Cw1-w4uLnSo",
    authDomain: "estacionamiento-924f2.firebaseapp.com",
    databaseURL: "https://estacionamiento-924f2-default-rtdb.firebaseio.com",
    projectId: "estacionamiento-924f2",
    storageBucket: "estacionamiento-924f2.appspot.com",
    messagingSenderId: "630654601417",  
    appId: "1:630654601417:web:c0b013bce1e4592813e518"
};
const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.firestore();
