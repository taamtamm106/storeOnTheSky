import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCbe-hEXy5t1sSoogqGIkBaYiUI9bZq-6s",
    authDomain: "storeonthesky.firebaseapp.com",
    databaseURL: "https://storeonthesky.firebaseio.com",
    projectId: "storeonthesky",
    storageBucket: "storeonthesky.appspot.com",
    messagingSenderId: "97155469882"
};
export const myFirebase = firebase.initializeApp(config);

