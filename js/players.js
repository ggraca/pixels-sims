function spawnPlayer(x, y){
  var player = new Player()
  player.graphics.x = x
  player.graphics.y = y
  players.push(player);
  playersContainer.addChild(player.graphics);
}

class Player{
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.actions = []
    this.target = null
    this.kills = 0
    this.resources = 0

    this.initGraphics()
  }
  initGraphics(){
    this.graphics.beginFill(0xFF00FF);
    this.graphics.drawRect(0, 0, 1, 1);

    this.graphics.hitArea = new PIXI.Rectangle(0, 0, 1, 1);
    this.graphics.interactive = true

    var that = this
    this.graphics.click = function(){
      showDataForUser(that)
    }
  }
  die(){
    var index = players.indexOf(this)

    this.graphics.parent.removeChild(this.graphics)
    delete this

    players.splice(index, 1);
  }
  goTo(pos){
    this.actions = astar({x: this.graphics.x, y: this.graphics.y}, {x: pos.x, y: pos.y})
    if(this.actions == undefined) this.actions = []
    this.target = pos
  }
  findPointInEye(eye){
    this.actions = []
    do{
      var pos = eye.randomPoint()
      if(pos.x < 0) continue
      if(pos.x >= VENUE_WIDTH) continue
      if(pos.y < 0) continue
      if(pos.y >= VENUE_HEIGHT) continue

      this.goTo(pos)
    }while(this.actions.length == 0)
  }
  findTerrain(){
    // Get out of the storm
    if (!storm.current.isPointInside(this.graphics.x, this.graphics.y)){
      this.findPointInEye(storm.next)
      return true
    }

    if (storm.waiting)
      return false

    if(!storm.next.isPointInside(this.graphics.x, this.graphics.y)){
      this.findPointInEye(storm.next)
      return true
    }

    return false
  }
  findPlayer(){
    var r  = 10

    for (var i = 0; i < players.length; i++){
      if (players[i] == this)
        continue

      var d = distance(this.graphics.x, this.graphics.y, players[i].graphics.x, players[i].graphics.y)
      if(d > r)
        continue

      if(getRandomInt(0, 2) == 0){
        players[i].kills++
        this.die()
      }
      else{
        this.kills++
        players[i].die()
      }
      return true
    }

    return false
  }
  findResource(){
    var r  = 30

    var closest = null
    var closest_distance = 100
    for (var i = 0; i < resources.length; i++){
      // continue if not in range
      var d = distance(this.graphics.x, this.graphics.y, resources[i].graphics.x, resources[i].graphics.y)
      if(d > r)
        continue

      if(closest == null || closest_distance > d){
        closest = new Node(resources[i].graphics.x, resources[i].graphics.y)
        closest_distance = d
      }
    }

    if(closest == null)
      return false

    this.goTo(closest)
    return true
  }
  decideTarget(){
    if (this.findPlayer())
      return

    if (!storm.current.isPointInside(this.graphics.x, this.graphics.y)){
      if(this.actions.length > 0 && storm.next.isPointInside(this.target.x, this.target.y))
        return
    }

    if (this.actions.length > 0){
      return
    }


    if(this.findTerrain())
      return

    if (this.findResource())
      return
  }
  targetReached(){
    if(this.actions.length > 0) return
    this.target = null
    for (var i = 0; i < resources.length; i++){
      if(this.graphics.x == resources[i].graphics.x && this.graphics.y == resources[i].graphics.y){
        removeResource(i)
        this.resources++
      }
    }
  }
  move(){
    this.decideTarget()

    if(this.actions.length > 0){
      var dir = this.actions[0]
      this.actions.splice(0, 1)
      this.graphics.x += dir.x
      this.graphics.y += dir.y
    }

    this.targetReached()
  }
}
