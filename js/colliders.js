function tableCollider(x,y) {
  for(var i = 1; i < 6; i++){
    for(var j = 1; j < 4; j++){
      collider_map[x+i][y+j] = true;
    }
  }
  collider_map[x+2][y+0] = true;
  collider_map[x+4][y+0] = true;
  collider_map[x+2][y+4] = true;
  collider_map[x+4][y+4] = true;
  collider_map[x+0][y+2] = true;
  collider_map[x+6][y+2] = true;
}

function generateTables() {
  var tables = [];
  for(var k = 0; k < 4; k++){
    for(var l = 0; l < 4; l++){
      var table = tableCollider(17+9*k,9+7*l);
      tables.push(table);
    }
  }
}


function verticalCollider(x,yi,yf) {
  for (var i = yi; i <= yf; i++) {
    collider_map[x][i] = true;
  }
}


function horizontalCollider(y,xi,xf) {
  for (var i = xi; i <= xf; i++) {
    collider_map[i][y] = true;
  }
}

function generateStageSeats() {
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 2; j++) {
      horizontalCollider(10+2*i,2+6*j,5+6*j);
    }
  }
}

// Call colliders functions

generateTables();
generateStageSeats();

verticalCollider(14,0,23);
verticalCollider(24,0,4);
verticalCollider(30,0,4);
verticalCollider(38,0,4);
verticalCollider(44,0,4);
verticalCollider(49,0,4);
verticalCollider(55,0,4);
verticalCollider(55,8,10);
verticalCollider(55,14,17);

horizontalCollider(18,55,59);
horizontalCollider(24,55,59);
horizontalCollider(30,55,59);
horizontalCollider(36,55,59);
