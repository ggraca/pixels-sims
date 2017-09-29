var app = new PIXI.Application(60, 37, {backgroundColor : 0x111111});
document.getElementById("canvas_container").appendChild(app.view);
var background = PIXI.Sprite.fromImage('assets/background.png')

var playersContainer = new PIXI.Container();
for (var i = 0; i < 100; i++){
  var player = new Player()
  players.push(player)
  playersContainer.addChild(player);
}

app.stage.addChild(background);
app.stage.addChild(playersContainer);

// Listen for animate update
app.ticker.add(function(delta) {
  //players.move()
});
