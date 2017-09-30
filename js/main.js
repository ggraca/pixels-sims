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
    new ActivitySeat({x: x+2, y: y+0}, 200, null),
    new ActivitySeat({x: x+4, y: y+0}, 200, null),
    new ActivitySeat({x: x+2, y: y+4}, 200, null),
    new ActivitySeat({x: x+4, y: y+4}, 200, null),
    new ActivitySeat({x: x+0, y: y+2}, 200, null),
    new ActivitySeat({x: x+6, y: y+2}, 200, null)
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

function getWCMenSeats(){
  var seats = []
  for (var i = 0; i < 4; i++) {
    seats.push(new ActivitySeat({x:58, y:25 +i}, 300, null))
  }
  return seats
}

function getWCWomenSeats(){
  var seats = []
  for (var i = 0; i < 4; i++) {
    seats.push(new ActivitySeat({x:58, y:31 +i}, 300, null))
  }
  return seats
}



function createMainStage(){
  var seats = []
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 2; j++) {
      for (var k = 2+6*j; k <= 5+6*j; k++) {
        seats.push(new ActivitySeat({x: k, y: 10+2*i}, 300, null))
      }
    }
  }
  return new MainStage(seats, [])
}

var app = new PIXI.Application(60, 37, {backgroundColor : 0x111111});
document.getElementById("canvas_container").appendChild(app.view);
var background = PIXI.Sprite.fromImage('assets/background.png')



wc_men = new WCMen(getWCMenSeats(),queueWC_men);
wc_women = new WCWomen(getWCMenSeats(),[]);
tables = createTables();
main_stage = createMainStage();

var playersContainer = new PIXI.Container();
var maxParticipants = 0

app.stage.addChild(background);
app.stage.addChild(playersContainer);


// Listen for animate update
var ticks = 0

var delay = 0;
app.ticker.add(function(delta) {
  delay += 1
  if(delay < 10)
    return

  console.log("TICKS:" + ticks)
  ticks += 1

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
