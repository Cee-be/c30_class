// 
//
//

const CELL_SIZE = 200;
const OPEN_TILE = 0;
const IMPOSSIBLE = 1;
//const WATER = 0;
//const LAVA = 0;
const PLAYER = 9;
const PLAYER2 = 8;
let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 3,
};
let thePlayer2 = {
  x: 0,
  y: 2,
};
let playerImg1;
let playerImg2;

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  //add player to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
  grid[thePlayer2.y][thePlayer2.x] = PLAYER2;

  //resizing image
  playerImg1.resize(300, 500);
  playerImg2.resize(300, 500);
}

function draw() {
  background("beige");
  displayGrid();
}

function preload(){
  playerImg1 = loadImage("fireboy.png");
  playerImg2 = loadImage("watergirl.png");
}

function toggleCell(x, y) {
  //make sure the cell you're toggling actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPOSSIBLE;
    }
    else if (grid[y][x] === IMPOSSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed() {
  //fireboy movement
  if (key === "w"){
    movePlayer(thePlayer, thePlayer.x, thePlayer.y - 1);
  }
  else if (key === "d"){
    movePlayer(thePlayer, thePlayer.x + 1, thePlayer.y);
  }
  else if (key === "a"){
    movePlayer(thePlayer, thePlayer.x - 1, thePlayer.y);
  }

  //watergirl movement
  if (keyCode === UP_ARROW){
    movePlayer2(thePlayer2, thePlayer2.x, thePlayer2.y - 1);
  }
  else if (keyCode ===RIGHT_ARROW){
    movePlayer2(thePlayer2, thePlayer2.x + 1, thePlayer2.y);
  }
  else if (keyCode === LEFT_ARROW){
    movePlayer2(thePlayer2, thePlayer2.x - 1, thePlayer2.y);
  }
}

//moving player1(fireboy)
function movePlayer(player, newX, newY){
  if (newX < 0 || newX >= cols || newY < 0 || newY >= rows){
    return;
  }

  if (grid[newY][newX] === OPEN_TILE) {
    grid[player.y][player.x] = OPEN_TILE;

    //moving player locat
    thePlayer.x = newX;
    thePlayer.y = newY;

  
    //mark new spot
    if (player === thePlayer){
      grid[player.y][player.x] = PLAYER;
    } 
    else {
      grid[player.y][player.x] = PLAYER2;
    }
  }
}


//moving player2(watergirl)
function movePlayer2(player2, newX, newY){
  if (newX < 0 || newX >= cols || newY < 0 || newY >= rows){
    return;
  }

  if (grid[newY][newX] === OPEN_TILE) {
    grid[player2.y][player2.x] = OPEN_TILE;

    //moving player locat
    thePlayer2.x = newX;
    thePlayer2.y = newY;

  
    //mark new spot
    if (player2 === thePlayer2){
      grid[player2.y][player2.x] = PLAYER2;
    } 
    else {
      grid[player.y][player.x] = PLAYER;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === IMPOSSIBLE) {
        fill("black");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER){
        image(playerImg1, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER2){
        image(playerImg2, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //pick 0 or 1 randomly
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPOSSIBLE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}