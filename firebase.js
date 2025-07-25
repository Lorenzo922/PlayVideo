// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-PEvp2reLWNxI_HKPMS2vofxSNOvDzDE",
  authDomain: "playvideos-e2d5d.firebaseapp.com",
  databaseURL: "https://playvideos-e2d5d-default-rtdb.firebaseio.com",
  projectId: "playvideos-e2d5d",
  storageBucket: "playvideos-e2d5d.appspot.com",
  messagingSenderId: "220622211507",
  appId: "1:220622211507:web:920bc3199ffacb5b7963c6",
  measurementId: "G-EJCD4QDK6G"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
