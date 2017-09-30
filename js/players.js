class Player{
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.target = null
    this.actions = []

    this.niceness = null
    this.coding = null
    this.design = null
    this.charm = null

    this.exp = 1000
    this.hunger = getRandomInt(50, 100) * 1.0
    this.fun = getRandomInt(50, 100) * 1.0
    this.needs = getRandomInt(50, 100) * 1.0

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
  }
  setTarget(zone){
    this.target = zone
    var targetPosition = this.target.getQueuePosition()
    this.goTo(targetPosition)
  }
  updateHealth(){
    this.hunger -= 1
    this.fun -= 1
    this.needs -= 1
  }
  decideTarget(){
    if(this.hunger < 20 || this.fun < 20 || this.needs < 20){
      if (wc_men.getQueuePosition()) {
        this.setTarget(wc_men)
      }
      return
    }

    if(this.target != null && this.target.getQueuePosition() != null)
      return

    // Find Table
    var tables_temp = [].concat(tables)
    shuffle(tables_temp)
    for (var i = 0; i < tables_temp.length; i++) {
      if(tables_temp[i].getQueuePosition() == null) continue
      return this.setTarget(tables_temp[i])
    }

    // if(this.target == null)
    //   return this.setTarget(main_stage)

  }
  targetReached(){
    if(this.target == null) return

    var targetPosition = this.target.getQueuePosition()
    if (targetPosition == null) return
    if(this.graphics.x == targetPosition.x && this.graphics.y == targetPosition.y){
      this.target.addUser(this)
      this.target = null
    }
  }
  move(){
    if(players.indexOf(this) == 1)
      console.log(this.target)

    this.updateHealth()
    this.decideTarget()

    if(this.actions.length > 0){
      var dir = this.actions[0]
      this.actions.splice(0, 1)
      this.graphics.x += dir.x
      this.graphics.y += dir.y
    }

    this.targetReached()
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
