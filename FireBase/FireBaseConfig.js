import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
 

const FirebaseConfig = {
    apiKey: "AIzaSyB8-VN5djpol9bTLPffoaQ5VjM5SG4enyw",
    authDomain: "recipe-dd7d3.firebaseapp.com",
    projectId: "recipe-dd7d3",
    storageBucket: "recipe-dd7d3.appspot.com",
    messagingSenderId: "640277837786",
    appId: "1:640277837786:web:a89df5eee300ad910f32e3",
    measurementId: "G-6ZH9K1NXMT"
  };

if(!firebase.apps.length){
  firebase.initializeApp(FirebaseConfig);
}

export {firebase}
