//Interactive Scene Assignment
//Ceberta Adum
//date

//
//


let bubbleY;
let bubbleX;
let bubbleDY;
let bubbleDX;
let bubbleRadius;
let ballRadius;
let ballY;
let ballX;
let ballDX;
let topLimit;
let bottomLimit;
let bubbleTop;
let sitting;
let ballDY;
let scene;
let bounceTarget;
let bounces;
let sceneMessage;
let r, g, b;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  resetLevel();
  initializeVariables();
}

function draw() {
  backScene();
  miniBubbles();

  myBubble();
  moveBall();
  changeScenes();
  movingBubble();
}

function initializeVariables() {
  x = windowWidth / 2;
  //bubbleY = windowHeight / 4;
  bubbleY = windowHeight -100;
  bubbleX = windowWidth/2;
  bubbleDX = random(-2, 2);
  bubbleDY = random(-2, 2);
  bubbleRadius = 50;
  ballRadius = 50;
  //ballY = bubbleY - bubbleRadius / 2 - ballRadius / 2;
  ballY = 50;
  ballDY = random(2, 4);
  ballDX = random(-3, 3);
  ballX = windowWidth/2;
  topLimit = bubbleRadius / 2;
  bottomLimit = height - bubbleRadius / 2;
  bubbleTop = bubbleY - bubbleRadius / 2;
  sitting = true;
  bounceTarget = 5;
  scene = 1;
  sceneMessage = 0;
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
    playLevel();
  }
  else if (scene === 2) {
    //level 2
    //fill(random(255), random(255), random(255));
    background(20, 50, 50);
    fill("#2FA3C9");
    noStroke();
    for (let i = 0; i < 10; i++){

      //stuff this in the setup
      let bx = random(windowWidth);
      let by = random(windowHeight);
      //
      circle(bx, by, random(5, 10));
      //circle(50 + i*100, 100 + (i*30 % windowHeight), 20 + i*2);
    }

    if (sceneMessage < 120){
      textSize(28);
      fill(255);
      textAlign(CENTER, CENTER);
      text("One Last Round!!!", windowWidth/2, windowHeight/2);
      sceneMessage++;
    }

 
    bubbleRadius = 70;
    ballRadius = 70;
    bounceTarget = 7;
    playLevel();
        
  }
  else if (scene === 3) {
    background(0, 30, 80);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 200, 255);
    text ("Nice Work!", windowWidth/2, windowHeight/2);
  }
}


function myBubble(){
  fill("yellow");
  circle(bubbleX, bubbleY, bubbleRadius);
}

function myBall(){
  fill(r, g, b);
  strokeWeight(4);
  circle(ballX, ballY, ballRadius + 10);
  fill(r, g, b);
  circle(ballX, ballY, ballRadius);
}

function miniBubbles(){
  for (let i = 0; i < 10; i++){
    let bx = random(windowWidth);
    let by = random(windowHeight);
    fill(255, 255, 255, 100);
    circle(bx, by, random(2, 5));
  }
}

function backScene(){
  //colorful and moving stroke
  for (let sy = 0; sy < windowHeight; sy++){
    stroke(170, 215, 220, map(sy, 0, windowHeight, 50, 200));
    line(0, sy, windowWidth, sy);
  }
}

function moveBall() {
  ballX += ballDX;
  ballY += ballDY;
  
  ballDX += random(-0.5, 0.5);
  //ballDX = constrain(ballDX, -5, 5);
  // ballX += ballDX;

  if (ballX -ballRadius/2 < 0 || ballX + ballRadius/2 > windowWidth){
    ballDX *= -1;
    randomColors();
  }
  if (ballY - ballRadius/2 < 0){
    ballDY *= -1;
    randomColors();
  }

  if (ballY + ballRadius >= windowHeight){
    resetLevel();
  }
}

function randomColors(){
  r = random(255);
  g = random(255);
  b = random(255);
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

  bubbleX = constrain(bubbleX, bubbleRadius, windowWidth - bubbleRadius);
  bubbleY = constrain(bubbleY, bubbleRadius, windowHeight - bubbleRadius);
}

function checkWin(){
  if (ballY + ballRadius >= height){
    scene ++;
    resetLevel();
  }
}

function resetLevel(){
  bubbleX = windowWidth/2;
  bubbleY = windowHeight - 150;

  ballX= windowWidth/2;
  ballY = 100;
  ballDX = random(-2, 3);
  ballDY = random(1, 3);

  bounces = 0;
}

function checkCollisions(){
  let d = dist(ballX, ballY, bubbleX, bubbleY);
  //let bubbleTop = bubbleY - bubbleRadius/2;
  
  if (d < bubbleRadius/2 + ballRadius/2 && ballDY >0){
    ballY = bubbleY - (bubbleRadius/2 + ballRadius/2);
    ballDY = -abs(ballDY);

    ballDX += random(-1, 1);

    bounces++;
    if (bounces >= bounceTarget){
      scene++;
      resetLevel();
    }
  }
}

