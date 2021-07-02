import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAIpH2SBdYPnJ6vvHXLGmvm1vKKDxIHfDQ",
    authDomain: "financasapp-233f0.firebaseapp.com",
    databaseURL: "https://financasapp-233f0-default-rtdb.firebaseio.com",
    projectId: "financasapp-233f0",
    storageBucket: "financasapp-233f0.appspot.com",
    messagingSenderId: "349840143708",
    appId: "1:349840143708:web:0c12bd63a16b3022643d99",
    measurementId: "G-76C3RCJFDM"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export default firebase;
