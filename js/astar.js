class Node{
  constructor(x, y, gscore, hscore, cameFrom){
    this.x = x
    this.y = y
    this.gscore = gscore
    this.hscore = hscore
    this.cameFrom = cameFrom
  }
  fscore(){
    return this.gscore + this.hscore
  }
}

function getNodeInList(n, list){
  for (var i = 0; i < list.length; i++) {
    if(n.x == list[i].x && n.y == list[i].y)
      return list[i]
  }
  return null
}

function compareByFscore(a, b){
  return a.fscore() - b.fscore()
}

function hcost(start, end){
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}

function getNeighbours(node, end){
  nodes = []
  for(var i = -1; i <= 1; i++){
    for(var j = -1; j <= 1; j++){
      if(i == 0 && j == 0 || i != 0 && j != 0) continue;

      var newx = node.x+i
      var newy = node.y+j

      if(newx < 0 || newx >= VENUE_WIDTH) continue
      if(newy < 0 || newy >= VENUE_HEIGHT) continue

      if(newx != end.x || newy != end.y){
        if(collider_map[newx][newy] == true) continue
      }
      nodes.push(new Node(newx, newy, node.gscore+1, hcost({x: newx, y: newy}, end), node))
    }
  }
  return nodes
}

function reconstruct_path(node){
  var nodePath = []
  var current = node
  while(current != null){
    nodePath.push(current)
    current = current.cameFrom
  }
  nodePath.reverse()
  var directions = []
  for (var i = 0; i < nodePath.length-1; i++) {
    var dirx = nodePath[i+1].x - nodePath[i].x
    var diry = nodePath[i+1].y - nodePath[i].y
    directions.push({x: dirx, y: diry})
  }
  return directions
}

function astar(start, end){
  startNode = new Node(start.x, start.y, 0, hcost(start, end), null)

  discoveredNodes = [startNode]
  visitedNodes = []

  while(discoveredNodes.length != 0){
    //console.log(discoveredNodes.length)
    // Look at availiable nodes and pick the one with better score
    discoveredNodes = discoveredNodes.sort(compareByFscore)
    var currentNode = discoveredNodes[0]

    // Is it the final?
    if(currentNode.x == end.x && currentNode.y == end.y)
      return reconstruct_path(currentNode)

    // Move to visited
    discoveredNodes.splice(0, 1)
    visitedNodes.splice(0, 0, currentNode)

    // Expand neighbours
    var neighbours = getNeighbours(currentNode, end)
    for(var i = 0; i < neighbours.length; i++){
      var neighbour = neighbours[i]

      // Drop if was already visited
      if(getNodeInList(neighbour, visitedNodes) != null) continue

      var previous = getNodeInList(neighbour, discoveredNodes)

      // Add if first time see
      if(previous == null){
        previous = neighbour
        discoveredNodes.push(previous)
      }

      // If already there, was this a better path?
      if(neighbour.fscore() < previous.fscore()){
        previous.gscore = neighbour.gscore
        previous.hscore = neighbour.hscore
        previous.cameFrom = neighbour.cameFrom
      }
    }
  }
}
