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
let totBetAmt = 13680;
let people = [4, 2, 7, 1, 6, 8, 9, 5, 3, 0];
const glob_data = amt;

console.log(people, totBetAmt);

const marginP = 30; //document.getElementById("marginP").value; //30; //in %
const marginAmt = (totBetAmt * (100 - marginP)) / 100;

//changed code
// const marginErrorP = 6,
// peopleErrorP = 6; // in %
const minAmtScrip = 0; //document.getElementById("minAmtScrip").value;
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
