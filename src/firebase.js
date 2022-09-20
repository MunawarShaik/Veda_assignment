import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK5FV6p3P4NB5Os-BneeQGlW9YLQyImEE",
  authDomain: "vedaassignment.firebaseapp.com",
  databaseURL: "https://vedaassignment-default-rtdb.firebaseio.com",
  projectId: "vedaassignment",
  storageBucket: "vedaassignment.appspot.com",
  messagingSenderId: "1063665643580",
  appId: "1:1063665643580:web:308da25e9014f404501339",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
