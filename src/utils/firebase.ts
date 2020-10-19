import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARYdiOJuzS_DpdMhWPkunOy2zi1a_oM88",
  authDomain: "bigspook-7b263.firebaseapp.com",
  databaseURL: "https://bigspook-7b263.firebaseio.com",
  projectId: "bigspook-7b263",
  storageBucket: "bigspook-7b263.appspot.com",
  messagingSenderId: "636133052717",
  appId: "1:636133052717:web:ed2cf2142e95d7f71983a4",
  measurementId: "G-EPQTX4RGJ9"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();