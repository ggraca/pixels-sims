function spawnPlayer(x, y){
  var player = new Player()
  player.graphics.x = x
  player.graphics.y = y
  //player.changeColor(0xFF00FF);
  players.push(player);
  playersContainer.addChild(player.graphics);
}

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

wc_men = new WCMen();
wc_women = new WCWomen();
tables = createTables();

var playersContainer = new PIXI.Container();
var maxParticipants = 116

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

  if(players.length < maxParticipants){
    spawnPlayer(26, 36)
    spawnPlayer(28, 36)
    spawnPlayer(30, 36)
    spawnPlayer(32, 36)
    spawnPlayer(34, 36)
  }

});
