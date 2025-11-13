//Assignment
//Ceberta Adum
//12th November, 2025

//Extra For Experts
// // Harzard interaction - fireboy fears water and waterhgirl fears water
// // Button-trigger - when button is pushed, walls open
// // two-player mechanics - two separated player(fireboy and watergirl) that work on diff. commands

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

//Deciding which tile and safe and to whom
function updatePlayer(p, safeTile, deadlyTile){
  // gravity
  p.vy += 0.4;
  let nextY = p.y + p.vy; 

  if (playerMoveTo(p, p.x, nextY)){
    p.y = nextY;
    p.onGround = false;
  }
  else{
    p.vy = 0;
    p.onGround = true;
    let bottomGrid = Math.floor((p.y + p.h) / CELL_SIZE);
    p.y = bottomGrid * CELL_SIZE - p.h;
  }

  //Checking the tile under player 
  let gridX = Math.floor((p.x + p.w/2) / CELL_SIZE);
  let gridY = Math.floor((nextY + p.h - 1)/ CELL_SIZE);

  if (gridY < 0 || gridY >= rows || gridX < 0 || gridX >= cols){
    return;
  }

  
  let currentTile = grid[gridY][gridX];

  //safe on safetile (!falling)
  if (currentTile === PLATFORM || currentTile === safeTile){
    p.y = gridY * CELL_SIZE -p.h;
    p.vy = 0;
    p.onGround = true;
  }
  else{
    p.y = nextY;
    p.onGround = false;
  }

  //Checking deadily tile
  if (currentTile === deadlyTile || currentTile === GREEN){
    if (p === fireboy){
      p.x = 35;
    }
    else{
      p.x = 0;
    }
    p.y = 700;
    p.vy = 0;
    p.onGround = false;
  }
}


function keyPressed() {
  keys[key] = true;
}
function keyReleased(){
  keys[key] = false;
}

function playerMovement(){
  //fireboy movement
  if (keys["w"] && fireboy.onGround){
    fireboy.vy = -12;
    fireboy.onGround = false;
  }
  if (keys["d"] && !keys["a"] && playerMoveTo(fireboy, fireboy.x + 4, fireboy.y)){
    fireboy.x += 3;
  }
  if (keys["a"] &&  !keys["d"] && playerMoveTo(fireboy, fireboy.x - 4, fireboy.y)){
    fireboy.x -= 3;
  }

  //watergirl movement
  if (keys["ArrowUp"] && watergirl.onGround){
    watergirl.vy = -12;
    watergirl.onGround = false;
  }
  if (keys["ArrowRight"] && !keys["ArrowLeft"] && playerMoveTo(watergirl, watergirl.x + 4, watergirl.y)){
    watergirl.x += 3;
  }
  if (keys["ArrowLeft"] && !keys["ArrowRight"] && playerMoveTo(watergirl, watergirl.x - 4, watergirl.y)){
    watergirl.x -= 3;
  }
}

//Tile player is on
function playerOnTile(player, tileType){
  let gridX2 = Math.floor((player.x + player.w/2)/ CELL_SIZE);
  let gridY2 = Math.floor((player.y + player.h/2)/ CELL_SIZE);
  return grid[gridY2] && grid[gridY2][gridX2] === tileType;
}

//Player activating the button
function playerButtonActivate(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === WALL_BTN){
        if (playerOnTile(fireboy, WALL_BTN) || playerOnTile(watergirl, WALL_BTN)){
          grid[y][x] = BUTTON_PRESSED;
          
          if (y === 9){
            clearWall(6);
          }
          else if (y === 6){
            clearWall(3);
          }
        }
      }
    }
  }
}

//wall becoming empty
function clearWall(rowNum){
  for (let x = 0; x < cols; x++){
    if (grid[rowNum][x]  === WALL){
      grid[rowNum][x] = EMPTY;
    }
  }
}

//Doors activating when player reaches end
function doorsActivate(){
  if  (playerOnTile(fireboy, DOOR_FIRE) && playerOnTile(watergirl, DOOR_WATER)){
    console.log("Level Complete!");
  }
}

//Doors opening when activated
function openDoors(){
  for (let y = 0; y < rows; y ++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === DOOR_FIRE || DOOR_WATER){
        grid[y][x] = EMPTY; //maybe image of door open
      }
    }
  }
}

//Moven
function playerMoveTo(player, newX, newY){
  let left = Math.floor(newX / CELL_SIZE);
  let right = Math.floor((newX + player.w -1)/ CELL_SIZE);
  let topRow = Math.floor(newY / CELL_SIZE);
  let bottom = Math.floor((newY + player.h -1)/ CELL_SIZE);

  for (let y = topRow; y <= bottom; y++){
    for (let x = left; x <= right; x++){
      if (y < 0 || y >= rows || x < 0 || x >= cols){
        return false;
      }
      let tile = grid[y][x];
      if (tile === PLATFORM || 
          tile === WALL || 
          tile === WALL_BTN || 
          tile === DOOR_FIRE || 
          tile === DOOR_WATER){
        return false;
      }
    }
  }
  return true;
}

//Visible objects in the grid
function displayGrid() {
  image (gameBackground, 0, 0, width, height);

  //constrain
  fireboy.x = constrain(fireboy.x, 0, width - fireboy.w);
  fireboy.y = constrain(fireboy.y, 0, height - fireboy.h);

  watergirl.x = constrain(watergirl.x, 0, width - watergirl.w);
  watergirl.y = constrain(watergirl.y, 0, height - watergirl.h);

  //Including different images
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
