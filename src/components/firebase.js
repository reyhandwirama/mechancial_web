// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWZ264wq9cBpAYCUdYIYFatnoVUn8r2l0",
  authDomain: "mechanical-keyboard-1bc50.firebaseapp.com",
  projectId: "mechanical-keyboard-1bc50",
  storageBucket: "mechanical-keyboard-1bc50.appspot.com",
  messagingSenderId: "889673903056",
  appId: "1:889673903056:web:fabf24a9aa7052f40967d5",
  measurementId: "G-EEWK7JMSZ5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export const storage = firebase.storage();
export default firebase;