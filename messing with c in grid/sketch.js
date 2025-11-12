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
let BUTTON_PRESSED;

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

let keys = {};
let playerImg1;
let playerImg2;
let tile;
let waterpit;
let firepit;
let greenpit;
let platformHeight;
let platformWidth;

function preload(){
  //Loading Images
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
  btn_pressed = loadImage("btn_pressed.png");
}

function setup() {
  createCanvas(cols * CELL_SIZE, rows * CELL_SIZE);

  let aspectRatio = tile.width / tile.height;
  platformWidth = 115;
  platformHeight = platformWidth / aspectRatio;

  //   createCanvas(1000, 750);

  // tilesHigh = lines.length;
  // tilesWide = lines[0].length;

  // tileWidth = width / tilesWide;
  // tileHeight = height / tilesHigh;

  // tiles = createEmpty2dArray(tilesWide, tilesHigh);
}

function draw() {
  image(gameBackground, 0, 0, width, height);
  displayGrid();
  playerMovement();
  playerButtonActivate();
  
  updatePlayer(fireboy, LAVA, WATER);
  updatePlayer(watergirl, WATER, LAVA);

  //players
  image(playerImg1, fireboy.x, fireboy.y, fireboy.w, fireboy.h);
  image(playerImg2, watergirl.x, watergirl.y, watergirl.w, watergirl.h);
}

function updatePlayer(p, safeTile, deadlyTile){
  // gravity
  p.vy += 0.1;
  p.y += p.vy;

  //collision
  let gridX = Math.floor(p.x / CELL_SIZE);
  let gridY = Math.floor((p.y + p.h)/ CELL_SIZE);

  //hazard detection
  if (gridY < 0 || gridY >= rows || gridX < 0 || gridX >= cols){
    return;
  }
    
  let currentTile = grid[gridY][gridX];

  if (currentTile === PLATFORM || currentTile === safeTile){
    p.vy = 0;
    p.onGround = true;
    p.y = gridY * CELL_SIZE - p.h;
  }
  else{
    p.onGround = false;
  }
  if (currentTile === deadlyTile || currentTile === GREEN){
    p.x = 0;
    p.vy = 0;
    p.y = 700;
  }
}


function keyPressed() {
  keys[key.toLowerCase()] = true;
  keys[keyCode] = true;
}

function keyReleased(){
  keys[key.toLowerCase()] = false;
  keys[keyCode] = false;
}

function playerMovement(){

  if (playerMoveTo(fireboy, fireboy.x, fireboy.y + fireboy.vy)){
    fireboy.y += fireboy.vy;
  }
  else{
    fireboy.vy = 0;
    fireboy.onGround = true;
  }

  
  //fireboy movement
  if (keys["w"] && fireboy.onGround){
    fireboy.vy = -4;
    fireboy.onGround = false;
  }
  if (keys["d"] && playerMoveTo(fireboy, fireboy.x + 4, fireboy.y)){
    fireboy.x += 2;
  }
  if (keys["a"] && playerMoveTo(fireboy, fireboy.x - 4, fireboy.y)){
    fireboy.x -= 2;;
  }

  //watergirl movement
  if (keys[UP_ARROW] && watergirl.onGround){
    watergirl.vy = -6;
    watergirl.onGround = false;
  }
  if (keys[RIGHT_ARROW] && playerMoveTo(watergirl, watergirl.x + 4, watergirl.y)){
    watergirl.x += 2;
  }
  if (keys[LEFT_ARROW] && playerMoveTo(watergirl, watergirl.x - 4, watergirl.y)){
    watergirl.x -= 2;
  }
}

function playerOnTile(player, tileType){
  let gridX = Math.floor((player.x + player.w/2)/ CELL_SIZE);
  let gridY = Math.floor((player.y + player.h/2)/ CELL_SIZE);
  return grid[gridY] && grid[gridY][gridX] === tileType;
}

function playerButtonActivate(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === WALL_BTN){
        if (playerOnTile(fireboy, WALL_BTN) || playerOnTile(watergirl, WALL_BTN)){
          grid[y][x] = BUTTON_PRESSED;
          openForButton(x, y);
        }
      }
    }
  }
}

function openForButton(btnX, btnY){
  for (let y = 0; y < rows; y ++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === WALL){
        grid[y][x] = EMPTY;
      }
    }
  }
}

function doorsActivate(){
  for (let y = 0; y < rows; y ++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === DOOR_FIRE || DOOR_WATER){
        if (playerOnTile(fireboy, DOOR_FIRE) || playerOnTile(watergirl, DOOR_WATER)){
          grid[y][x] = DOOR_OPEN; ///create DOOR_OPEN
          openDoors();
        }
      }
    }
  }
}

function openDoors(){
  for (let y = 0; y < rows; y ++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === DOOR_FIRE || DOOR_WATER){
        grid[y][x] = EMPTY; //maybe image of door open
      }
    }
  }
}

function playerMoveTo(player, newX, newY){
  let left = Math.floor(newX / CELL_SIZE);
  let right = Math.floor((newX + player.w -1)/ CELL_SIZE);
  let top = Math.floor(newY / CELL_SIZE);
  let bottom = Math.floor((newY + player.h -1)/ CELL_SIZE);

  for (let y = top; y <= bottom; y++){
    for (let x = left; x <= right; x++){
      if (y < 0 || y >= rows || x < 0 || x >= cols){
        return false;
      }
      let tile = grid[y][x];
      if (tile === PLATFORM || tile === WALL || tile === WALL_BTN || tile === DOOR_FIRE || tile === DOOR_WATER){
        return false;
      }
    }
  }
  return true;
}

function displayGrid() {
  image (gameBackground, 0, 0, width, height);

  //constrain
  fireboy.x = constrain(fireboy.x, 0, width - fireboy.w);
  fireboy.y = constrain(fireboy.y, 0, height - fireboy.h);

  watergirl.x = constrain(watergirl.x, 0, width - watergirl.w);
  watergirl.y = constrain(watergirl.y, 0, height - watergirl.h);

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
      else if (cell === BUTTON_PRESSED){
        image(btn_pressed, xpos, ypos, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}
