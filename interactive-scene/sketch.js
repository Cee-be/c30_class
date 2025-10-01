//Interactive Scene Assignment
//Ceberta Adum
//date

//
//

let x = windowWidth / 2;
let bubbleY = windowHeight / 4;
let bubbleRadius = 100;
let ballRadius = 50;
let ballY = bubbleY - bubbleRadius / 2 - ballRadius / 2;
let topLimit = bubbleRadius / 2;
let bottomLimit = height - bubbleRadius / 2;
let bubbleTop = bubbleY - bubbleRadius / 2;
let sitting = true;
let velY = 0;
let accY = 0.5;
let scene1 = true;
let scene2 = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
}

function draw() {
  background("lightblue");

  myBubble();
  moveBall();
}

function changeScenes(){
  // the first scene
  if (scene1 === true) {
    fill(255, 255, 0);
    text ("Ready?!!", 100, 100);
  }
  //the next scene
  else if (scene2 === true){
    fill("blue");
    text("Nice", 200, 200);
  }
}

function myBubble() {
  // fills bubble with yellow
  fill("yellow");
  circle(x, bubbleY, bubbleRadius);

  //fills ball with black
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

function keyPressed(){
  if (scene1 === true){
    if (keyCode === RIGHT_ARROW){
      value = 0;
    }
    scene
  }
}

