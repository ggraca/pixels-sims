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

var wc_men = new WCMen();
var wc_women = new WCWomen();

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
