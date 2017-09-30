class Player{
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.target = null
    this.previous_seat = null
    this.target_seat = null
    this.actions = []
    this.locked = false
    this.table = null

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
  }
  updateHealth(){
    this.hunger -= 0.1
    this.fun -= 0.1
    this.needs -= 0.1
  }
  decideTarget(){
    if(this.locked)
      return

    if(this.hunger < 20 && !kitchen.isFull())
      this.setTarget(kitchen)

    if(this.needs < 20 && !wc_men.isFull())
      this.setTarget(wc_men)

    // if(this.fun < 20 && !main_stage.isFull())
    //   this.setTarget(main_stage)


    if(this.target != null && !this.target.isFull())
      return

    if(this.table == null){
      // Find Table
      var tables_temp = [].concat(tables)
      shuffle(tables_temp)
      for (var i = 0; i < tables_temp.length; i++) {
        if(tables_temp[i].players_count == 6) continue
        if(tables_temp[i].getNewSeat() == null) continue
        return this.setTarget(tables_temp[i])
      }
    }

    var rand = getRandomInt(0, 30)
    if(rand < 23)
      return this.setTarget(this.table)
    else/* if (previous_target == "Table") */{
      return this.setTarget(main_stage)
    }

  }
  targetReached(){
    if(this.target == null || this.target_seat == null) return
    if(this.graphics.x == this.target_seat.position.x && this.graphics.y == this.target_seat.position.y){

      if(this.target.constructor.name == "Table" && this.table == null){
        this.table = this.target
        this.table.players_count += 1
      }

      this.previous_target = this.target.constructor.name
      this.target.addUser(this)
      this.target = null
    }
  }
  decideMoves(){
    if(this.locked)
      return

    if(this.target == null || this.target.isFull()) return

    if(this.target_seat == null || !this.target_seat.available())
      this.target_seat = this.target.getNewSeat()

    this.goTo(this.target_seat.position)
  }
  move(){
    // if(players.indexOf(this) == 1)
    //   console.log(this.target)

    this.updateHealth()
    this.decideTarget()
    this.decideMoves()

    if(this.actions.length > 0){
      var dir = this.actions[0]
      this.actions.splice(0, 1)
      this.graphics.x += dir.x
      this.graphics.y += dir.y
    }

    this.targetReached()
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
