function createCircle(x, y, r){
  var circle = new PIXI.Graphics();
  circle.position = {x: x, y: y};
  stormContainer.addChild(circle);
  return circle
}

class Circle{
  constructor(x, y, r){
    this.previous_transform = {x: x, y: y, r: r}
    this.transform = {x: x, y: y, r: r}
    this.graphics = createCircle(x, y, r)
    this.updateGraphics(x, y, r)
    this.target = null
  }
  setCurrentPosition(){
    this.previous_transform = {
      x: this.transform.x,
      y: this.transform.y,
      r: this.transform.r
    }
    this.updateGraphics()

  }
  setNewPosition(){
    var next_radius = this.transform.r * 1.0 / 2
    var formation_radius = this.transform.r - next_radius
    this.transform.r = this.previous_transform.r = next_radius

    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * formation_radius * formation_radius;
    this.transform.x += Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    this.transform.y += Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

    this.updateGraphics()
  }
  updateGraphics(){
    this.graphics.x = this.transform.x
    this.graphics.y = this.transform.y
    this.graphics.clear()
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.arc(0, 0, this.transform.r, 0, Math.PI*2);
  }
  update(cooldown){
    if(this.target == null)
      return

    var size_step = (this.previous_transform.r - this.target.transform.r) * 1.0 / cooldown
    this.transform.r -= size_step

    var x_step = (this.previous_transform.x - this.target.transform.x) * 1.0 / cooldown
    this.transform.x -= x_step

    var y_step = (this.previous_transform.y - this.target.transform.y) * 1.0 / cooldown
    this.transform.y -= y_step

    this.updateGraphics()
  }
  randomPoint(){
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * this.transform.r * this.transform.r;
    var x = this.transform.x + Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var y = this.transform.y + Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

    return {x: parseInt(x), y: parseInt(y)}
  }
  isPointInside(x, y){
    var xx = (x-this.transform.x) * (x-this.transform.x)
    var yy = (y-this.transform.y) * (y-this.transform.y)
    var d = Math.sqrt(xx + yy)
    return (d < this.transform.r)
  }
}

class Storm{
  constructor() {
    this.waiting = true
    this.cooldown = 100
    this.current_cooldown = this.cooldown

    this.current = null
    this.next = null
    this.initGraphics()
  }
  initGraphics(){
    this.current = new Circle(VENUE_WIDTH/2, VENUE_HEIGHT/2, VENUE_WIDTH/2 + 100);

    var next_radius = VENUE_HEIGHT / 2 - 5
    var next_x = getRandomInt(next_radius, VENUE_WIDTH - next_radius)
    this.next = new Circle(next_x, VENUE_HEIGHT/2, next_radius);
    this.current.target = this.next
  }

  update(){
    if (!this.waiting){
      this.current.update(this.cooldown)
    }

    this.current_cooldown -= 1
    if(this.current_cooldown <= 0){

      if(!this.waiting){
        this.current.setCurrentPosition()
        this.next.setNewPosition()
      }

      this.current_cooldown = this.cooldown
      this.waiting = !this.waiting
    }
  }
}
