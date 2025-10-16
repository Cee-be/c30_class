// Project Title
// -Sing: jellyfish scene using balls
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//Variables
//let myBubbles = [];
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
  //bubbleLoop();
  myBubble();
  moveBall();
}

//initializing variable
function initializingVariables(){
  time = random(1000);
  ballX = 50;
  ballY = 50;
  ballRadius = 50;
  bubbleX = 100;
  bubbleY = 100;
  bubbleX2 = 150;
  bubbleY2 = 150;
  bubbleXTime = 1000;
  bubbleYTime = 2000;
  bubbleX2Time = 50000;
  bubbleY2Time = 3000;
  bubbleRadius = random(50, 100);
}

//Creating ball/player
function myBall(){
  fill("black");
  circle(150, 50, 50);
}

//loop to move bubbles
function bubbleLoop(){
  for (let bubble of myBubbles){
    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + bubble.buffer) * height;
    bubble.time += bubble.deltaTime;
  
    fill("lightblue");
    noStroke();
    circle(bubble.x, bubble.y, bubbleRadius);
    circle(bubble.x, bubble.y, bubbleRadius);
  }
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
  bubbleY = noise(bubbleYTime + TIME_BUFFER) * height;
  bubbleX2 = noise(bubbleX2Time) * width;
  bubbleY2 = noise(bubbleY2Time + TIME_BUFFER) * height;
  bubbleXTime += 0.03;
  bubbleYTime += 0.02;
  bubbleX2Time += 0.06;
  bubbleY2Time + 0.05;
}

//move ball
function moveBall(){
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      ballY -= 5;
    } 
    else if (keyCode === DOWN_ARROW) {
      ballY += 5;
    } 
    else if (keyCode === LEFT_ARROW) {
      ballX -= 5;
    } 
    else if (keyCode === RIGHT_ARROW) {
      ballX += 5;
    }
  }
};
