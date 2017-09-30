var playersList = [];

var threshNiceness = null
var threshCoding = null
var threshDesign = null
var minPlayers = 3

function generateTableThresholds(tN,tC,tD){
  tN = getRandomInt(40, 240)
  tC = getRandomInt(40, 240)
  tD = getRandomInt(40, 240)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function isTableReady(playersList, tN, tC, tD) {
  var sumN = 0;
  var sumC = 0;
  var sumD = 0;
  if (playersList.length > 3) {
    for (var i = 0; i < playersList.length; i++) {
      sumN = sumN + playersList[i].niceness
      sumC = sumC + playersList[i].coding
      sumD = sumD + playersList[i].design
    }
    if (sumN >= tN && sumC >= tC && sumD >= tD) {
      return true;
    }
  }
}
/*
generateTableThresholds(threshNiceness, threshCoding, threshDesign);
isTableReady(threshNiceness, threshCoding, threshDesign)
*/
