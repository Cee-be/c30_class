// Rectangle Neighbours 2d Array Demo

const CELL_SIZE = 200;
const OPEN_TILE = 0;
const IMPOSSIBLE = 1;
const PLAYER = 9;
const PLAYER2 = 8;
let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 0,
};
let thePlayer2 = {
  x: 0,
  y: 3,
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
}

function draw() {
  background("beige");
  displayGrid();
}

function preload(){
  playerImg1 = loadImage("fireboy.png");
  playerImg2 = loadImage("watergirl.png");
}

// function mousePressed() {
//   let x = Math.floor(mouseX/CELL_SIZE);
//   let y = Math.floor(mouseY/CELL_SIZE);

//   //self
//   toggleCell(x ,y);

//   //neighbours
//   toggleCell(x + 1, y);
//   toggleCell(x - 1, y);
//   toggleCell(x, y - 1);
//   toggleCell(x, y + 1);
// }

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
  // if (key === "r") {
  //   grid = generateRandomGrid(cols, rows);
  // }
  // else if (key === "e") {
  //   grid = generateEmptyGrid(cols, rows);
  // }
  if (key === "w"){
    thePlayer.y - 1;
  }
  else if (key === "s"){
    thePlayer.y + 1;
  }
  else if (keyCode === DOWN_ARROW){
    thePlayer.y + 1;
  }
  else if (key === "d"){
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  else if (key === "a"){
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
}

function movePlayer(x, y){
  if (x >= 0 && x < cols && y >- 0 && y <= rows && grid[y][x] === OPEN_TILE){
    //pre pos
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    //moving player locat
    thePlayer.x = x;
    thePlayer.y = y;
  
    //put player on grid
    //grid[thePlayer.y][thePlayer.x = x] = PLAYER;
  
    //reset old spot
    grid[oldY][oldX] = OPEN_TILE;

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
        // fill("red");
      }
      else if (grid[y][x] === PLAYER2){
        image(playerImg2, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        // fill("red");
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