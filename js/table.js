class Table {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    //console.log("(" + this.x + "," + this.y +")");
    this.generateCollider();
  }
  generateCollider() {
    for(var i = 1; i < 6; i++){
      for(var j = 1; j < 4; j++){
        collider_map[this.x+i][this.y+j] = true;
      }
    }
    collider_map[this.x+2][this.y+0] = true;
    collider_map[this.x+4][this.y+0] = true;
    collider_map[this.x+2][this.y+4] = true;
    collider_map[this.x+4][this.y+4] = true;
    collider_map[this.x+0][this.y+2] = true;
    collider_map[this.x+6][this.y+2] = true;
  }
}
