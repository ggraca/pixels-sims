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
