var app = new PIXI.Application(60, 37, {backgroundColor : 0x111111});
document.getElementById("canvas_container").appendChild(app.view);
var background = PIXI.Sprite.fromImage('assets/background.png')

var tables = [];
for(var k = 0; k < 4; k++){
  for(var l = 0; l < 4; l++){
    var table = new Table(17+9*k,9+7*l);
    tables.push(table);
  }
}

var playersContainer = new PIXI.Container();
for (var i = 0; i < 100; i++){
  var player = new Player()
  if (collider_map[player.graphics.x][player.graphics.y] == "0") {
    players.push(player);
    playersContainer.addChild(player.graphics);
  }
}

var wc = new WC();

app.stage.addChild(background);
app.stage.addChild(playersContainer);


// Listen for animate update
var delay = 0;
app.ticker.add(function(delta) {
  delay += 1
  if(delay < 10)
    return

  delay = 0
  for (var i = 0; i < players.length; i++){
    players[i].move()
  }
});
