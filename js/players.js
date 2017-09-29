class Player extends PIXI.Graphics {
  constructor() {
    super()

    var color = Math.floor(Math.random() * 100);
    if(color < 10)
      this.beginFill(0x00FF00);
    else if (color < 25)
      this.beginFill(0xFFFF00);
    else
      this.beginFill(0xFF0000);
    this.drawRect(0, 0, 1, 1);

    this.x = Math.floor(Math.random() * VENUE_WIDTH);
    this.y = Math.floor(Math.random() * VENUE_HEIGHT);
    //console.log("Player (" + this.x + "," + this.y +")");

  }
}
