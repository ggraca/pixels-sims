function showDataForUser(user = null){
  selected_user = user
  if(user === null){
    document.getElementById("player_info").style.visibility = "hidden"
    return
  }

  document.getElementById("player_info").style.visibility = "visible"

  document.getElementById("kills").innerHTML = user.kills
  document.getElementById("resources").innerHTML = user.resources
}

function navigate(x, y){
  var zoom = app.stage.scale.x
  app.stage.position.x += (x * (4/zoom))
  app.stage.position.y += (y * (4/zoom))
}


function set_navigation_keys(){
  app.stage.pivot.x = VENUE_WIDTH/2
  app.stage.pivot.y = VENUE_HEIGHT/2

  app.stage.position.x += VENUE_WIDTH/2
  app.stage.position.y += VENUE_HEIGHT/2

  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
          navigate(1, 0)
        break;

        case 38: // up
          navigate(0, 1)
        break;

        case 39: // right
          navigate(-1, 0)
        break;

        case 40: // down
          navigate(0, -1)
        break;

        case 187: // +
        case 107: // +
          zoom(app.stage.scale.x + 0.5)
        break;

        case 189: // -
        case 109: // -
          zoom(app.stage.scale.x - 0.5)
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
}

function zoom(scale){
  if(scale > 4) scale = 4
  if(scale < 1) scale = 1;

  app.stage.scale.x = scale;
  app.stage.scale.y = scale;
}
