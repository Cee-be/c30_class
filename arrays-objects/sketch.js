// Project Title
// -Sing: jellyfish scene using balls
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//Variables
let ballX;
let ballY;
let ballRadius;
let bubbleX;
let bubbleY;
let bubbleX2;
let bubbleY2;
let bubbleRadius;
let time;
const TIME_BUFFER = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializingVariables();
}

function draw() {
  background(220);
  myBall();
  myBubble();
}

//initializing variable
function initializingVariables(){
  ballX = 50;
  ballY = 50;
  ballRadius = 50;
  bubbleX = 100;
  bubbleY = 100;
  bubbleX2 = 150;
  bubbleY2 = 150;
  bubbleXTime = 1000;
  bubbleYTime = 2000;
  bubbleX2Time = 1500;
  bubbleY2Time = 3050;
  bubbleRadius = 50;
}

//Creating ball/player
function myBall(){
  fill("black");
  circle(150, 50, 50);
}

//Creating bubble/killer
function myBubble(){
  moveBubbles();
  fill("lightblue");
  noStroke();
  circle(bubbleX, bubbleY, bubbleRadius);
  circle(bubbleX2, bubbleY2, bubbleRadius);
}

//using perlin noise
function moveBubbles(){
  bubbleX = noise(bubbleXTime) * width;
  bubbleY = noise(bubbleYTime) * height;
  bubbleX2 = noise(bubbleX2Time) * width;
  bubbleY2 = noise(bubbleY2Time) * height;
  bubbleXTime += 0.03;
  bubbleYTime += 0.04;
  bubbleX2Time += 0.01;
  bubbleY2Time + 0.05;
}