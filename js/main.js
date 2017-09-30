function getTableSeats(x,y) {
  return [
    new ActivitySeat({x: x+2, y: y+0}, 1000, null),
    new ActivitySeat({x: x+4, y: y+0}, 1000, null),
    new ActivitySeat({x: x+2, y: y+4}, 1000, null),
    new ActivitySeat({x: x+4, y: y+4}, 1000, null),
    new ActivitySeat({x: x+0, y: y+2}, 1000, null),
    new ActivitySeat({x: x+6, y: y+2}, 1000, null)
  ]
}

function createTables() {
  var tables = [];
  for(var k = 0; k < 4; k++){
    for(var l = 0; l < 4; l++){
      var table_seats = getTableSeats(17+9*k,9+7*l);
      tables.push(new Table(table_seats, [{x:17, y:9}]));
    }
  }
  return tables
}


var app = new PIXI.Application(60, 37, {backgroundColor : 0x111111});
document.getElementById("canvas_container").appendChild(app.view);
var background = PIXI.Sprite.fromImage('assets/background.png')

var playersContainer = new PIXI.Container();
var maxParticipants = 100
for (var i = 0; i < maxParticipants; i++){
  var player = new Player()
  if (collider_map[player.graphics.x][player.graphics.y] == "0") {
    if (i == maxParticipants-1) {
      player.changeColor(0xFF00FF);
    }
    players.push(player);
    playersContainer.addChild(player.graphics);
  }
}

wc_men = new WCMen();
wc_women = new WCWomen();
tables = createTables();



app.stage.addChild(background);
app.stage.addChild(playersContainer);


// Listen for animate update
var delay = 0;
app.ticker.add(function(delta) {
  delay += 1
  if(delay < 10)
    return

  wc_men.update();
  wc_women.update();

  delay = 0
  for (var i = 0; i < players.length; i++){
    players[i].move()
  }

});
