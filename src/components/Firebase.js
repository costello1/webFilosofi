import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD22GIqQKVwcYC9Dsr-Dv-S5J9TqlQzNFU",
    authDomain: "sito-filosofi-in-erba.firebaseapp.com",
    projectId: "sito-filosofi-in-erba",
    storageBucket: "sito-filosofi-in-erba.appspot.com",
    messagingSenderId: "854740779490",
    appId: "1:854740779490:web:c54cb541c470c7f263b9bb",
    measurementId: "G-Y8XYCNEJ68"
};

firebase.initializeApp(firebaseConfig);

export default firebase;