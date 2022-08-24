// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4tnH6d7-rdFDRECH8WVY_rBWreS3jLXo",
    authDomain: "todo-apps-task.firebaseapp.com",
    databaseURL: "https://todo-apps-task-default-rtdb.firebaseio.com/",
    projectId: "todo-apps-task",
    storageBucket: "todo-apps-task.appspot.com",
    messagingSenderId: "135346754766",
    appId: "1:135346754766:web:6d6fd4da787fa49fb66c9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth(app);

export default auth;
