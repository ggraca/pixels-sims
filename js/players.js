class Player{
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.target = null
    this.actions = []
    this.niceness = null
    this.coding = null
    this.design = null
    this.charm = null
    this.project = null
    this.generateStats()
    this.initGraphics()
    this.findTarget()
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
  }
  findTarget(){
    do{
      var index = Math.floor(Math.random() * 16)
      this.target = tables[index]
    } while(this.target.getQueuePosition() == null)
  }
  move(){
    if(this.target){
      var targetPosition = this.target.getQueuePosition()
      if(targetPosition == null)
        this.findTarget()
      targetPosition = this.target.getQueuePosition()
      this.goTo(targetPosition)
    }

    if(this.actions.length > 0){
      var dir = this.actions[0]
      this.actions.splice(0, 1)
      this.graphics.x += dir.x
      this.graphics.y += dir.y
    }

    if(this.target){
      var targetPosition = this.target.getQueuePosition()
      //console.log(targetPosition)
      if(this.graphics.x == targetPosition.x && this.graphics.y == targetPosition.y){
        this.target.addUser(this)
        this.target = null
      }
    }
  }
  unlock(){
    this.target = wc_men
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
