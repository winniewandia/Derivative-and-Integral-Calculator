import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
  apiKey: "AIzaSyAtE2lsba6emwY7GD-_BFlIYFFZbkjJlXk",
  authDomain: "derivative-calc-fc374.firebaseapp.com",
  projectId: "derivative-calc-fc374",
  storageBucket: "derivative-calc-fc374.appspot.com",
  messagingSenderId: "117605142073",
  appId: "1:117605142073:web:71671b5e6e39160ed807e8",
  measurementId: "G-SC5B7P6SM1"
})

export const auth = app.auth()
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