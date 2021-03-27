import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyA7guxSk-tg4ck84uTymhZeuRuppRZsApw",
  authDomain: "itsohdb.firebaseapp.com",
  databaseURL: "https://itsohdb-default-rtdb.firebaseio.com",
  projectId: "itsohdb",
  storageBucket: "itsohdb.appspot.com",
  messagingSenderId: "775472829165",
  appId: "1:775472829165:web:5090c3bfc9f3fa6c88b2e4",
  measurementId: "G-1X71M9XMR1"
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
