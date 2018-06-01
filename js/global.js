// CONSTANTS
const VENUE_WIDTH = 400;
const VENUE_HEIGHT = 200;
const MAX_PLAYERS = 10;

// Misc
var app;
var storm;

// Listen for animate update
var speed = 50;
var delay = 0;
var seconds = 0
var minutes = 0
var hours = 0

// UI
var selected_user = null

// Terrain
var terrainContainer = new PIXI.Container();
var stormContainer = new PIXI.Container();
var collider_map = []
var resources = []

// Terrain params
var cities = 2
var villages = 10
var houses = 20
var trees = 200
var bushes = 30

// Players
var playersContainer = new PIXI.Container();
var players = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function distance(x1, y1, x2, y2){
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
