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
    new ActivitySeat({x: x+2, y: y+0}, 200 + getRandomInt(-180, 180), null),
    new ActivitySeat({x: x+4, y: y+0}, 200 + getRandomInt(-180, 180), null),
    new ActivitySeat({x: x+2, y: y+4}, 200 + getRandomInt(-180, 180), null),
    new ActivitySeat({x: x+4, y: y+4}, 200 + getRandomInt(-180, 180), null),
    new ActivitySeat({x: x+0, y: y+2}, 200 + getRandomInt(-180, 180), null),
    new ActivitySeat({x: x+6, y: y+2}, 200 + getRandomInt(-180, 180), null)
  ]
}

function createTables() {
  var tables = [];
  for(var k = 0; k < 4; k++){
    for(var l = 0; l < 4; l++){
      var table_seats = getTableSeats(17+9*k,9+7*l);
      tables.push(new Table(table_seats, []));
    }
  }
  return tables
}

function getWCMenSeats(){
  var seats = []
  for (var i = 0; i < 5; i++) {
    seats.push(new ActivitySeat({x:58, y:25 +i}, 50, null))
  }
  return seats
}

function getWCWomenSeats(){
  var seats = []
  for (var i = 0; i < 5; i++) {
    seats.push(new ActivitySeat({x:58, y:31 +i}, 50, null))
  }
  return seats
}
function getKitchenSeats(){
  var seats = []
  for (var i = 0; i < 12; i+=2) {
    seats.push(new ActivitySeat({x:58, y:4 +i}, 50, null))
  }
  return seats
}


function createMainStage(){
  var seats = []
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 2; j++) {
      for (var k = 2+6*j; k <= 5+6*j; k++) {
        seats.push(new ActivitySeat({x: k, y: 10+2*i}, 80 + getRandomInt(-30, 30), null))
      }
    }
  }
  return new MainStage(shuffle(seats), [])
}

var app = new PIXI.Application(60, 37, {backgroundColor : 0x111111});
document.getElementById("canvas_container").appendChild(app.view);
var background = PIXI.Sprite.fromImage('assets/background.png')
background.interactive = true
background.click = function(){
  showDataForUser(null)
}



wc_men = new WCMen(getWCMenSeats(), []);
wc_women = new WCWomen(getWCMenSeats(),[]);
kitchen = new Kitchen(getKitchenSeats(),[]);
tables = createTables();
main_stage = createMainStage();

var playersContainer = new PIXI.Container();
var maxParticipants = 90

app.stage.addChild(background);
app.stage.addChild(playersContainer);

var selected_user = null


// Listen for animate update
var speed = 30;
var delay = 0;
var seconds = 0
var minutes = 0
var hours = 0

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


app.ticker.add(function(delta) {
  delay += 1
  if(delay < 100/speed)
    return
  delay = 0

  seconds += 5
  if (seconds == 60) {
    minutes += 1
    seconds = 0
  }

  if (minutes == 60) {
    hours += 1
    minutes = 0
  }

  if(selected_user !== null){
    document.getElementById("hunger_value").innerHTML = Math.round(selected_user.hunger)
    document.getElementById("needs_value").innerHTML = Math.round(selected_user.needs)
    document.getElementById("fun_value").innerHTML = Math.round(selected_user.fun)
  }

  document.getElementById("timer_seconds").innerHTML = pad(seconds, 2)
  document.getElementById("timer_minutes").innerHTML = pad(minutes, 2)
  document.getElementById("timer_hours").innerHTML = pad(hours, 2)

  wc_men.update();
  wc_women.update();
  kitchen.update();
  main_stage.update();

  for (var i = 0; i < tables.length; i++){
    tables[i].update()
  }

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
