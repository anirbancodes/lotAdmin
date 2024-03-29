import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDoc,
  doc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
const fc = {
  apiKey: "AIzaSyAVgBu0P69xgUHnZ2Cc4G5IX6gHtb4-MBE",
  authDomain: "qclottery.firebaseapp.com",
  projectId: "qclottery",
  storageBucket: "qclottery.appspot.com",
  messagingSenderId: "650163027647",
  appId: "1:650163027647:web:961de905315b549657500a",
};
const app = initializeApp(fc);
const db = getFirestore(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    historyTable();
    // loadUserData(user.email);
  } else {
    window.location = "/pages/login.html";
  }
});

let glob_data = {};
let totBetAmt = 0;
let amt = [],
  people = [];
// async function loadUserData(email) {
//   const ref = doc(db, "dealers", email);
//   const docSnap = await getDoc(ref);
//   if (docSnap.exists()) {
//     let data = docSnap.data();
//     showUserCredits(data.name, data.credit);
//     historyTable(email);
//   }
// }

// function showUserCredits(name, credit) {
//   document.getElementById("profile-name").textContent += name;
//   document.getElementById("user-credit").textContent = credit;
// }

async function historyTable(date, match) {
  totBetAmt = 0;
  document.getElementById("sale-table").innerHTML = "";
  document.getElementById("comment-text").innerHTML = "";
  document.getElementById("totbetamt").innerHTML = "";
  if (!date) {
    let now = new Date();
    let date1 =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    date = date1;
  }
  if (!match) {
    match = "9:0 AM";
  }

  const ref = doc(db, "games", date);

  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const game = docSnap.data()[match];
    if (game) {
      glob_data = {};
      for (let i = 0; i < 10; i++) {
        let rowData = "";
        if (!game[i]) {
          glob_data[i] = [0, 0];
          continue;
        }
        let arr = [];
        rowData +=
          ` <div class="white-card">
          <div class="line">
          <p class="number">` +
          i +
          `</p>
          <p style="margin-left: 20px">`;
        let amtS = 0,
          peopleS = 0;
        let keys = Object.keys(game[i]);
        keys.forEach((scrip) => {
          amtS += game[i][scrip].amt;
          arr.push(
            game[i][scrip].amt + "(" + game[i][scrip].email.charAt(0) + ")"
          );
          peopleS++;
        });
        rowData +=
          `
        <span style="color: orangered">` +
          amtS +
          `</span>
          </p>
          <p>` +
          peopleS +
          `</p></div><div style="text-align:center; margin-top:-15px; color:#B0C4DE">`;

        arr.forEach(
          (sc) => (rowData += `<span style="font-size:10px">${sc} </span>`)
        );
        rowData += `
          </div></div>
      </div>`;
        document.getElementById("sale-table").innerHTML += rowData;
        glob_data[i] = [amtS, peopleS];
        totBetAmt += amtS;
        // people.push(peopleS);
      }
      document.getElementById("totbetamt").innerHTML = totBetAmt;
    } else {
      document.getElementById("totbetamt").innerHTML = 0;
      document.getElementById("comment-text").innerHTML =
        "No history for " + date + " " + match;
    }
  }
}
const showBtn = document.getElementById("showBtn");
showBtn.addEventListener("click", () => {
  totBetAmt = 0;
  let date = document.getElementById("date").value;
  let match = document.getElementById("history-match").value;

  if (date) {
    let i1 = date.indexOf("-"),
      i2 = date.lastIndexOf("-");
    date =
      date.substring(0, i1 + 1) +
      (Number(date.substring(i1 + 1, i2)) / 10) * 10 +
      "-" +
      (Number(date.substring(i2 + 1, i2 + 3)) / 10) * 10;
  } else if (!date) {
    let now = new Date();
    let date1 =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    date = date1;
  }
  historyTable(date, match);
});

const showRes = document.getElementById("showRes");
showRes.addEventListener("click", () => {
  console.log(glob_data);

  // let people = [];
  /*for (let z = 0; z < 10; z++) {
    if (people.includes(z)) continue;
    let maxPeopleNo = z;

    let sahiNo;
    for (let l = 0; l < 10; l++)
      if (!people.includes(l)) {
        sahiNo = l;
        break;
      }

    let maxPeople = glob_data[sahiNo][1];
    for (let k = 0; k < 10; k++) {
      if (glob_data[k][1] > maxPeople) {
        maxPeople = glob_data[k][1];
        maxPeopleNo = k;
      }
    }
    people.push(maxPeopleNo);
    console.log(people);
  }*/
  for (let i = 0; i < 10; i++) {
    if (!document.getElementById(`maxPS-${i}`).value) continue;
    people.push(document.getElementById(`maxPS-${i}`).value);
  }

  console.log(people, totBetAmt);

  const marginP = document.getElementById("marginP").value; //30; //in %
  const marginAmt = (totBetAmt * (100 - marginP)) / 100;

  // const marginErrorP = 6,
  // peopleErrorP = 6; // in %
  const minAmtScrip = document.getElementById("minAmtScrip").value;
  // 8x
  let winner2,
    c = 0;
  let winner1 = minAmtScrip;
  for (let i = 0; i < people.length; i++) {
    const no = people[i];
    console.log(no, glob_data[no]);
    const noAmt = glob_data[no][0];
    //check if we can afford
    const rewardAmt = noAmt * 8; //8x
    //  if (rewardAmt <= marginAmt * (1 + marginErrorP / 100)) {
    if (rewardAmt <= marginAmt) {
      if (c >= 2) break;
      if (c == 0) winner1 = no;
      if (c == 1) winner2 = no;
      c++;
    }
  }
  /* let winner = winner1;
   if (
    glob_data[winner1][0] * (1 + marginErrorP / 100) <= glob_data[winner2][0] &&
    glob_data[winner1][1] * (1 + peopleErrorP / 100) <= glob_data[winner2][1]
  ) {
    winner = winner2;
  } */

  console.log(winner1, winner2);
  document.getElementById("totBetAmt").innerHTML = totBetAmt;
  document.getElementById("res1").innerHTML = winner1;
  document.getElementById("res2").innerHTML = winner2;
  document.getElementById("winAmt1").innerHTML = 8 * glob_data[winner1][0];
  document.getElementById("winAmt2").innerHTML = 8 * glob_data[winner2][0];
});
