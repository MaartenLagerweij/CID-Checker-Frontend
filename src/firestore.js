import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDr5H-8pIVg7HBncKuEFqOlwO3BVw1ad_c",
  authDomain: "cid-checker-362410.firebaseapp.com",
  projectId: "cid-checker-362410",
  storageBucket: "cid-checker-362410.appspot.com",
  messagingSenderId: "254004414612",
  appId: "1:254004414612:web:a222517c5c80a650ee0c81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = firebase.firestore();