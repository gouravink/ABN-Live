import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyD8LGqVbeQHiyWlfghoS1Q8lbiv__YSI0w",
    authDomain: "abnlive-dev.firebaseapp.com",
    databaseURL: "https://abnlive-dev.firebaseio.com",
    projectId: "abnlive-dev",
    storageBucket: "abnlive-dev.appspot.com",
    messagingSenderId: "648303798706",
    appId: "1:648303798706:web:6908bc09e457f18e"
};


firebase.initializeApp(firebaseConfig);
const FBDB = firebase.database();
export const FBAuth = firebase.auth();


export default FBDB;