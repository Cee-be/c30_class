// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let terrian = [];
const NUMBER_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrian();
}

function draw() {
  background(220);
  fill("green");
  stroke("green");

  for (let theRect of terrian){
    rect(theRect.x, theRect.y, theRect.w, theRect.h);
  }
}

function generateTerrian() {
  let thewidth = width/NUMBER_OF_RECTS;
  let time = 0;
  let deltaTime = 0.005;
  for (let i = 0; i< NUMBER_OF_RECTS; i++) {
    let theHeight = noise(time) * height;
    let someRect = spawnRect(thewidth*i, thewidth, theHeight);
    terrian.push(someRect);     
    time += deltaTime; 
  }

};


function spawnRect(leftSide, rectWidth, rectHeight){
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}