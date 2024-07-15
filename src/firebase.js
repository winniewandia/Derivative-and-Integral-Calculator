// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtE2lsba6emwY7GD-_BFlIYFFZbkjJlXk",
  authDomain: "derivative-calc-fc374.firebaseapp.com",
  databaseURL: "https://derivative-calc-fc374.firebaseio.com",
  projectId: "derivative-calc-fc374",
  storageBucket: "derivative-calc-fc374.appspot.com",
  messagingSenderId: "117605142073",
  appId: "1:117605142073:web:71671b5e6e39160ed807e8",
  measurementId: "G-SC5B7P6SM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);


export default app

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBtsbNzlV6MK32WltXgfggUF6TVYN90xx4",
//   authDomain: "polynomial-calculator-de6d3.firebaseapp.com",
//   projectId: "polynomial-calculator-de6d3",
//   storageBucket: "polynomial-calculator-de6d3.appspot.com",
//   messagingSenderId: "548156249808",
//   appId: "1:548156249808:web:af709f682dad43190cf0d5",
//   measurementId: "G-FNJRE5EKWS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);