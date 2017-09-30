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

    this.graphics.x = Math.floor(Math.random() * VENUE_WIDTH);
    this.graphics.y = Math.floor(Math.random() * VENUE_HEIGHT);
    console.log("x: " + this.graphics.x + ", y: " + this.graphics.y)
  }
  goTo(pos){
    this.actions = astar({x: this.graphics.x, y: this.graphics.y}, {x: pos.x, y: pos.y})
    console.log(this.actions)
  }
  move(){
    if(this.actions.length == 0){
      this.goTo({x: Math.floor(Math.random() * VENUE_WIDTH), y: Math.floor(Math.random() * VENUE_HEIGHT)})
      while(this.actions === undefined){
        this.goTo({x: Math.floor(Math.random() * VENUE_WIDTH), y: Math.floor(Math.random() * VENUE_HEIGHT)})
      }
    }

    var dir = this.actions[0]
    this.actions.splice(0, 1)
    this.graphics.x += dir.x
    this.graphics.y += dir.y
  }
}
