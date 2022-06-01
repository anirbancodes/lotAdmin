//no. with lowest bet amount & max people wins
const amt = {
  0: [10, 2],
  1: [1100, 25],
  2: [1200, 38],
  3: [40, 4],
  4: [8000, 100],
  5: [965, 5],
  6: [300, 15],
  7: [990, 33],
  8: [975, 15],
  9: [100, 10],
};
const glob_data = amt;
const totBetAmt = 14000;
//const minAmt = 2;
let maxPeople = []; //sorted in decreasing
const marginP = 40; //in %
const marginAmt = (totBetAmt * (100 - marginP)) / 100;
const marginErrorP = 10,
  peopleErrorP = 10; // in %

for (let i = 0; i < 10; i++) {
  if (!document.getElementById("maxPS-0").value) continue;
  maxPeople.push(document.getElementById("maxPS-0").value);
}
const minAmt = document.getElementById("minAmtScrip").value;

/*let max_people = glob_data[0][2],
  max_people_scrip,
  people = [],
  temp = [],
  scrip = [];
for (let z = 0; z < 10; z++) {
  max_people = glob_data[0][2];
  if (scrip.includes(z)) continue;

  for (let k = 0; k < 10; k++) {
    // people.push(glob_data[k][2])
    if (glob_data[k][2] > max_people) {
      max_people = glob_data[k][2];
      max_people_scrip = k;
    }
  }
  // people.push(max_people);
  scrip.push(max_people_scrip);
}*/

// 8x
let winner2,
  c = 0;
let winner1 = minAmt;
for (let i = 0; i < 10; i++) {
  const no = maxPeople[i];
  const noAmt = amt[no][0];
  //check if we can afford
  const rewardAmt = noAmt * 8; //8x
  if (rewardAmt <= marginAmt * (1 + marginErrorP / 100)) {
    if (c >= 2) break;
    if (c == 0) winner1 = no;
    if (c == 1) winner2 = no;
    c++;
  }
}
let winner = winner1;
if (
  amt[winner1][0] * (1 + marginErrorP / 100) <= amt[winner2][0] &&
  amt[winner1][1] * (1 + peopleErrorP / 100) <= amt[winner2][1]
) {
  winner = winner2;
}

console.log(winner);
alert(winner);