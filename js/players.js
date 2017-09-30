class Player{
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.actions = []
    this.niceness = null
    this.coding = null
    this.design = null
    this.charm = null
    this.generateStats()
    this.initGraphics()
  }
  initGraphics(){
    var stats = [this.coding, this.design, this.charm]
    var color = stats.indexOf(Math.max(...stats))
    Math.floor(Math.random() * 100);
    if(color == 0)
      this.graphics.beginFill(0xFF0000);
    else if (color == 1)
      this.graphics.beginFill(0xFFFF00);
    else
      this.graphics.beginFill(0x00FF00);
    this.graphics.drawRect(0, 0, 1, 1);

    this.graphics.x = Math.floor(Math.random() * VENUE_WIDTH);
    this.graphics.y = Math.floor(Math.random() * VENUE_HEIGHT);
    //console.log("x: " + this.graphics.x + ", y: " + this.graphics.y)
  }
  goTo(pos){
    this.actions = astar({x: this.graphics.x, y: this.graphics.y}, {x: pos.x, y: pos.y})
    //console.log(this.actions)
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
  generateStats(){
    var nD = Math.random()
    var nN = Math.random()
    var nC = Math.random() + 0.2
    var nCh = Math.random() - 0.3
    var sumRand = nN + nC + nD + nCh

    this.niceness = Math.round(nN / sumRand * 200)
    this.coding = Math.round(nC / sumRand * 200)
    this.design = Math.round(nD / sumRand * 200)
    this.charm = Math.round(nCh / sumRand * 200)
  }
  changeColor(color){
    this.graphics.beginFill(color);
    this.graphics.drawRect(0, 0, 1, 1);
  }
}
