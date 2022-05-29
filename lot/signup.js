import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVgBu0P69xgUHnZ2Cc4G5IX6gHtb4-MBE",
  authDomain: "qclottery.firebaseapp.com",
  projectId: "qclottery",
  storageBucket: "qclottery.appspot.com",
  messagingSenderId: "650163027647",
  appId: "1:650163027647:web:961de905315b549657500a",
};

let signupBtn = document.getElementById("signupBtn");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

signupBtn.addEventListener("click", (e) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await setDoc(
        doc(db, "users", user.email),
        {
          margin: 0,
          history: [],
        },
        { merge: true }
      );

      alert("Done ! Press OK");
      window.location = "/";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
});
