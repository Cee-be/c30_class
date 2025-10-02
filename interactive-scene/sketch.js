//Interactive Scene Assignment
//Ceberta Adum
//date

//
//

let x;
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
let scene;
let bounceTarget;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  resetLevel();
  initializeVariables();
}

function draw() {
  background("lightblue");

  myBubble();
  moveBall();
  changeScenes();
  movingBubble();
}

function initializeVariables() {
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
  bounceTarget = 5;
  scene = 1;
}

function playLevel(){
  moveBall();
  movingBubble();
  checkCollisions();
  
  myBubble();
  myBall();
  
  //Score check
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Bounces: " + bounces + "/" + bounceTarget, 20, 20);
}


function changeScenes(){
  if (scene === 1) {
    //level 1
    bubbleRadius = 100;
    ballRadius = 50;
    accY = 0.5;
    playLevel();
  }
  else if (scene === 2) {
    //level 2
    fill(random(255), random(255), random(255));
    bubbleRadius = 70;
    ballRadius = 70;
    accY = 0.7;
    playLevel();
  }
  else if (scene === 3) {
    fill(0, 50, 40);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text ("Under Repairs", width/2, height/2);
  }
}


function myBubble(){
  fill("yellow");
  circle(bubbleX, bubbleY, bubbleRadius);
}

function myBall(){
  fill("black");
  circle(ballX, ballY, ballRadius);
}

function moveBall() {
  velY += accY;
  ballY += velY;

  velX += random(-0.5, 0.2);
  velX = constrain(velX, -5, 5);
  ballX += velX;

  if (ballX -ballRadius/2 < 0 || ballX + ballRadius/2 > width){
    velX = -1;
  }

  if (ballY + ballRadius/2 >= height){
    resetLevel();
  }
}

function movingBubble() {
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      bubbleY -= 5;
    } 
    else if (keyCode === DOWN_ARROW) {
      bubbleY += 5;
    } 
    else if (keyCode === LEFT_ARROW) {
      bubbleX -= 5;
    } 
    else if (keyCode === RIGHT_ARROW) {
      bubbleX += 5;
    }
  }
}

function checkWin(){
  if (ballY + ballRadius/2 >= height){
    scene ++;
    resetLevel();
  }
}

function resetLevel(){
  bubbleX = windowWidth/2;
  bubbleY = windowHeight/3;
  ballX= windowWidth/2;
  ballY = 100;
  velX = random(-2, 2);
  velY = 0;
  bounces = 0;
}

function checkCollisions(){
  let d = dist(ballX, ballY, bubbleX, bubbleY);
  //let bubbleTop = bubbleY - bubbleRadius/2;
  
  if (d < bubbleRadius/2 + ballRadius/2 && velY >0){
    ballY = bubbleY - (bubbleRadius/2 + ballRadius/2);
    velY = -0.8;
    bounces++;
    
    if (bounces >= bounceTarget){
      scene++;
      resetLevel();
    }
  }
}

