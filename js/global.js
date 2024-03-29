const VENUE_WIDTH = 60;
const VENUE_HEIGHT = 37;

var collider_map = []
for(var x = 0; x < VENUE_WIDTH; x++){
  var row = []
  for(var y = 0; y < VENUE_HEIGHT; y++){
    row.push("0")
  }
  collider_map.push(row)
}

var stage;
var wc_men;
var wc_women;
var tables = [];
var sponsors = [];
var players = [];

// QUEUES

queueSponsor1 = [];
for (var i = 16; i <= 23; i++) {
  queueSponsor1.push({x:i,y:4});
}

queueSponsor2 = [];
for (var i = 25; i <= 29; i++) {
  queueSponsor2.push({x:i,y:4});
}

queueSponsor3 = [];
for (var i = 31; i <= 37; i++) {
  queueSponsor3.push({x:i,y:4});
}

queueSponsor4 = [];
for (var i = 39; i <= 43; i++) {
  queueSponsor4.push({x:i,y:4});
}

queueSponsor5 = [];
for (var i = 45; i <= 48; i++) {
  queueSponsor5.push({x:i,y:4});
}

queueSponsor6 = [];
for (var i = 50; i <= 54; i++) {
  queueSponsor6.push({x:i,y:4});
}

queueFood1 = [];
for (var i = 55; i >= 20; i--) {
  queueFood1.push({x:i,y:6});
}

queueFood2 = [];
for (var i = 55; i >= 20; i--) {
  queueFood2.push({x:i,y:7});
}

queueWC_women = [];
for (var i = 29; i >= 27; i--) {
  queueWC_women.push({x:55,y:i});
}

queueWC_men = [];
for (var i = 21; i >= 19; i--) {
  queueWC_men.push(new Seat({x:55,y:i}));
}

queueStage2 = [];
for (var i = 35; i >= 31; i--) {
  queueStage2.push({x:55,y:i});
}

queueStage = [];
for (var i = 8; i <= 24; i++) {
  queueStage.push({x:13,y:i});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
