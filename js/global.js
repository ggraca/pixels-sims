const VENUE_WIDTH = 60;
const VENUE_HEIGHT = 37;

var collider_map = []
for(var i = 0; i < VENUE_HEIGHT; i++){
  var row = []
  for(var j = 0; j < VENUE_WIDTH; j++){
    row.push(false)
  }
  collider_map.push(row)
}

var stage;
var wc_men;
var wc_women;
var sponsors = [];
var players = [];

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
  queueWC_men.push({x:55,y:i});
}

queueStage2 = [];
for (var i = 35; i >= 31; i--) {
  queueStage2.push({x:55,y:i});
}

queueStage = [];
for (var i = 8; i <= 24; i++) {
  queueStage.push({x:13,y:i});
}
