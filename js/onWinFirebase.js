const firebaseConfig = {
  apiKey: "AIzaSyAVgBu0P69xgUHnZ2Cc4G5IX6gHtb4-MBE",
  authDomain: "qclottery.firebaseapp.com",
  projectId: "qclottery",
  storageBucket: "qclottery.appspot.com",
  messagingSenderId: "650163027647",
  appId: "1:650163027647:web:961de905315b549657500a",
};
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const list = [
  ["ani1@gm", 50],
  ["ani2@gm", 20],
  ["ani3@gm", 300],
];

list.forEach((item) => {
  //add(email)
  console.log(item[0], item[1]);
});

async function add(email, amt) {
  //   const auth = getAuth(app);
  //   let email = auth.currentUser;

  const ref = doc(db, "user", email);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    //let list = docSnap.data().list;
    const data = docSnap.data();

    await updateDoc(
      doc(db, "email-ph", "allph"),
      {
        list: arrayUnion(contact),
      },
      { merge: true }
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    });

    await updateDoc(
      doc(db, "users", email),
      {
        credit: data.credit + amt * 8,
        credits: arrayUnion({ time: 020405, trans: amt * 8 }),
        games: {},
      },
      { merge: true }
    );

    //add credit, add transaction to user history
    //update winning game list
    //update data in dealer profile
  }
}
