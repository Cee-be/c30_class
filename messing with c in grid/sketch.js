// 
//
//
//images - https://github.com/hadigghazi/FireBoy-and-WaterGirl/commits?author=DawoudTormos

const CELL_SIZE = 50;
const WALL = 8;
const WALL_BTN = 9;
const WATER = 3;
const LAVA = 2;
const GREEN = 4;
const DOOR_FIRE = 6;
const DOOR_WATER = 7;
const PLATFORM = 5;
const EMPTY = 0;

let grid = [
  [6, 7, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 4, 5, 8, 8, 8, 5, 5, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 5, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [8, 8, 5, 4, 5, 5, 0, 9, 0, 0],
  [0, 0, 0, 0, 0, 5, 5, 5, 5, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 5, 5, 5, 5, 0, 0, 9, 0, 0],
  [0, 0, 0, 0, 5, 5, 5, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 5, 5, 5, 3, 2, 5, 5, 5, 5],
];

let rows = 15;
let cols = 10;
let fireboy = {
  x: 35,
  y: 700,
  w: 40,
  h: 40,
  vy: 0,
  onGround: false
};

let watergirl = {
  x: 0,
  y: 700,
  w: 40,
  h: 40,
  vy: 0,
  onGround: false
};

let playerImg1;
let playerImg2;
let tile;
let waterpit;
let firepit;
let greenpit;
let platformHeight;
let platformWidth;

function preload(){
  playerImg1 = loadImage("fireboy.png");
  playerImg2 = loadImage("watergirl.png");

  gameBackground = loadImage("Ground.png");

  waterdoor = loadImage("watergirl_door.png");
  firedoor = loadImage("fireboy_door.png");
  tile = loadImage("tiles.png");

  firepit = loadImage("firepit.png");
  waterpit = loadImage("waterpit.png");
  greenpit = loadImage("greenpit.png");

  wall = loadImage("wall.png");
  wall_btn = loadImage("wallBtn.png");
}

function setup() {
  createCanvas(cols * CELL_SIZE, rows * CELL_SIZE);

  let aspectRatio = tile.width / tile.height;
  platformWidth = 115;
  platformHeight = platformWidth / aspectRatio;
}

function draw() {
  image(gameBackground, 0, 0, width, height);
  displayGrid();
  
  updatePlayer(fireboy);
  updatePlayer(watergirl);

  //players
  image(playerImg1, fireboy.x, fireboy.y, fireboy.w, fireboy.h);
  image(playerImg2, watergirl.x, watergirl.y, watergirl.w, watergirl.h);
}

function updatePlayer(p){
  // gravity
  p.vy += 0.5;
  p.y += p.vy;

  //collision
  let gridX = Math.floor(p.x / CELL_SIZE);
  let gridY = Math.floor((p.y + p.h)/ CELL_SIZE);

  if (grid[gridY] && grid[gridY][gridX] === PLATFORM){
    p.vy = 0;
    p.onGround = true;
    p.y = gridY * CELL_SIZE - p.h;
  } 
  else {
    p.onGround = false;
  }
}

function keyPressed() {
  //fireboy movement
  if (key === "w" && fireboy.onGround){
    fireboy.vy = -10;
    fireboy.onGround = false;
  }
  else if (key === "d"){
    fireboy.x += 20;
  }
  else if (key === "a"){
    fireboy.x -= 20;;
  }

  //watergirl movement
  if (keyCode === UP_ARROW && watergirl.onGround){
    watergirl.vy = -10;
    watergirl.onGround = false;
  }
  else if (keyCode ===RIGHT_ARROW){
    watergirl.x += 20;
  }
  else if (keyCode === LEFT_ARROW){
    watergirl.x -= 20;
  }
}

function displayGrid() {
  image (gameBackground, 0, 0, width, height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];
      let xpos = x * CELL_SIZE;
      let ypos = y * CELL_SIZE; 

      if (cell === PLATFORM){
        image(tile, xpos, ypos, platformWidth, platformHeight);
      }
      else if (cell === LAVA){
        image(firepit, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
      else if (cell === WATER){
        image(waterpit, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
      else if (cell === GREEN){
        image(greenpit, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
      else if (cell === WALL){
        image(wall, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
      else if (cell === WALL_BTN){
        image(wall_btn, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
      else if (cell === DOOR_WATER){
        image(waterdoor, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
      else if (cell === DOOR_FIRE){
        image(firedoor, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}
