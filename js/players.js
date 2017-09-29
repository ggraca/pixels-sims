class Player{
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.actions = []

    this.initGraphics()
  }
  initGraphics(){
    var color = Math.floor(Math.random() * 100);
    if(color < 10)
      this.graphics.beginFill(0x00FF00);
    else if (color < 25)
      this.graphics.beginFill(0xFFFF00);
    else
      this.graphics.beginFill(0xFF0000);
    this.graphics.drawRect(0, 0, 1, 1);

    this.graphics.x = Math.floor(Math.random() * 60);
    this.graphics.y = Math.floor(Math.random() * 37);
  }
  goTo(x, y){
    this.actions = astar({x: this.graphics.x, y: this.graphics.y}, {x: x, y: y})
    //console.log(this.actions)
  }
  move(){
    var dir
    if(this.actions.length > 0){
      dir = this.actions[0]
      this.actions.splice(0, 1)
      this.graphics.x += dir.x
      this.graphics.y += dir.y
    }
    // else{
    //   dir = Math.floor(Math.random() * 4)
    //   if(dir == 0)
    //     this.graphics.y += 1
    //   else if(dir == 1)
    //     this.graphics.x += 1;
    //   else if(dir == 2)
    //     this.graphics.y -= 1;
    //   else
    //     this.graphics.x -= 1
    // }
  }
}
