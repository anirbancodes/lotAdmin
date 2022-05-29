const firebaseConfig = {
  apiKey: "AIzaSyAVgBu0P69xgUHnZ2Cc4G5IX6gHtb4-MBE",
  authDomain: "qclottery.firebaseapp.com",
  projectId: "qclottery",
  storageBucket: "qclottery.appspot.com",
  messagingSenderId: "650163027647",
  appId: "1:650163027647:web:961de905315b549657500a",
};

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

let loginbtn = document.getElementById("loginBtn");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

loginbtn.addEventListener("click", (e) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const auth = getAuth();

  setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        document.getElementById("hide").style.display = "flex";
        document.getElementById("form").style.display = "none";
        document.getElementById("show-email").innerHTML = user.email;
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, " : ", errorMessage);
      });
  });
});
