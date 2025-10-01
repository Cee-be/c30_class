//Interactive Scene Assignment
//Ceberta Adum
//date

//
//

let x;
const scene1 = true;
let bubbleY;
let bubbleRadius;
let ballRadius;
let ballY;
let topLimit;
let bottomLimit;
let bubbleTop;
let sitting;
let velY;
let accY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = windowWidth / 2;
  bubbleY = windowHeight / 4;
  bubbleRadius = 100;
  ballRadius = 50;
  ballY = bubbleY - bubbleRadius / 2 - ballRadius / 2;
  topLimit = bubbleRadius / 2;
  bottomLimit = height - bubbleRadius / 2;
  bubbleTop = bubbleY - bubbleRadius / 2;
  sitting = true;
  velY = 0;
  accY = 0.5;
}

function draw() {
  background("lightblue");

  myBubble();
  moveBall();
}

function myBubble() {
  fill("yellow");
  circle(x, bubbleY, bubbleRadius);

  fill("black");
  circle(x, ballY, ballRadius);
}

function moveBall() {
  bubbleTop = bubbleY - bubbleRadius / 2;

  if (sitting) {
    // Keep the ball stuck to the top of the bubble
    ballY = bubbleTop - ballRadius / 2;
    velY = 0;
  } 
  else {
    // Gravity effect
    velY += accY;
    ballY += velY;
    
    if (ballY + ballRadius / 2 >= height) {
      ballY = height - ballRadius / 2;
      velY = 0;
    }

    // Collision with bubble top
    if (ballY + ballRadius / 2 >= bubbleTop) {
      sitting = true;
      ballY = bubbleTop - ballRadius / 2;
      velY = 0;
    }
  }
}

function mouseWheel(event) {
  bubbleY += event.delta * 0.1;
  bubbleY = constrain(bubbleY, topLimit, bottomLimit);

  // A fast scroll makes the ball fall
  if (abs(event.delta) > 30) {
    sitting = false;
  }
}

