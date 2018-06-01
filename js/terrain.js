class Resource{
  constructor(color) {
    this.color = color
    this.graphics = new PIXI.Graphics();
    this.initGraphics()
  }
  initGraphics(){
    this.graphics.beginFill(this.color);
    this.graphics.drawRect(0, 0, 1, 1);
  }
}

function initBackground(){
  var background = new PIXI.Graphics();
  background.beginFill(0x00FF00);
  background.drawRect(0, 0, VENUE_WIDTH, VENUE_HEIGHT);

  background.interactive = true
  background.click = function(){
    showDataForUser(null)
  }
  terrainContainer.addChild(background)
}

function initColliders(){
  for (var i = 0; i < VENUE_WIDTH; i++){
    collider_map.push([])
    for (var j = 0; j < VENUE_HEIGHT; j++){
      collider_map[i].push(false)
    }
  }
}

function addResource(x, y, color){
  if(collider_map[y][x] == true)
    return

  var resource = new Resource(color)
  resource.graphics.x = x
  resource.graphics.y = y
  resources.push(resource)
  terrainContainer.addChild(resource.graphics);
  collider_map[y][x] = true
}

function removeResource(i){
  collider_map[resources[i].graphics.y][resources[i].graphics.x] = false
  resources[i].graphics.parent.removeChild(resources[i].graphics)
  delete resources[i]
  resources.splice(i, 1);
}

function generateTree(){
  var x = getRandomInt(0, VENUE_WIDTH-1)
  var y = getRandomInt(0, VENUE_HEIGHT-1)
  addResource(x, y, 0x8E3D04)
  addResource(x+1, y, 0x8E3D04)
  addResource(x+1, y+1, 0x8E3D04)
  addResource(x, y+1, 0x8E3D04)
}

function generateHouse(x, y){
  var offset = 1
  x = x || getRandomInt(offset, VENUE_WIDTH-offset)
  y = y || getRandomInt(offset, VENUE_HEIGHT-offset)

  for (var i = -1; i <= 1; i++){
    for (var j = -1; j <= 1; j++){
      if (getRandomInt(0, 10) > 2 && !(i == 0 && j == 0)){
        addResource(x + j, y + i, 0xDEBD92)
      }
    }
  }
}

function generateVillage(x, y){
  var offset = 5
  x = x || getRandomInt(offset, VENUE_WIDTH-offset)
  y = y || getRandomInt(offset, VENUE_HEIGHT-offset)

  for (var i = -1; i <= 1; i++){
    for (var j = -1; j <= 1; j++){
      if (getRandomInt(0, 10) > 2){
        generateHouse(x + j * 4, y + i * 4)
      }
    }
  }
}

function generateCity(){
  var offset = 18
  var x = getRandomInt(offset, VENUE_WIDTH-offset)
  var y = getRandomInt(offset, VENUE_HEIGHT-offset)

  for (var i = -1; i <= 1; i++){
    for (var j = -1; j <= 1; j++){
      generateVillage(x + j * 13, y + i * 13)
    }
  }
}

function generateTerrain(){
  initBackground();
  initColliders();

  for (var i = 0; i < cities; i++)
    generateCity()

  for (var i = 0; i < villages; i++)
    generateVillage()

  for (var i = 0; i < houses; i++)
    generateHouse()

  for (var i = 0; i < trees; i++)
    generateTree()
}
