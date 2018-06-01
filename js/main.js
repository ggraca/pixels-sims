function update_time(){
  delay += 1
  if(delay < 100/speed)
    return false
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

  if(players.length == 1){
    showDataForUser(players[0])
    speed = 0
  }

  if(selected_user !== null){
    document.getElementById("hunger_value").innerHTML = Math.round(selected_user.hunger)
    document.getElementById("needs_value").innerHTML = Math.round(selected_user.needs)
    document.getElementById("fun_value").innerHTML = Math.round(selected_user.fun)
  }

  document.getElementById("timer_seconds").innerHTML = pad(seconds, 2)
  document.getElementById("timer_minutes").innerHTML = pad(minutes, 2)
  document.getElementById("timer_hours").innerHTML = pad(hours, 2)

  return true
}

function update(){

  if(!update_time())
    return

  for (var i = 0; i < players.length; i++){
    players[i].move()
  }

  storm.update();
}

function init(){
  app = new PIXI.Application(VENUE_WIDTH, VENUE_HEIGHT, {backgroundColor : 0x111111}, false, true);
  document.getElementById("canvas_container").appendChild(app.view);

  app.stage.addChild(terrainContainer);
  generateTerrain();

  app.stage.addChild(stormContainer);
  storm = new Storm()

  app.stage.addChild(playersContainer);
  for (var i = 0; i < MAX_PLAYERS; i++) {
    spawnPlayer(
      getRandomInt(0, VENUE_WIDTH),
      getRandomInt(0, VENUE_HEIGHT)
    );
  }

  set_navigation_keys();

  app.ticker.add(update);
}

init();
