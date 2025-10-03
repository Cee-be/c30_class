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
  bubbleRadius = 100;
  ballRadius = 50;
  //ballY = bubbleY - bubbleRadius / 2 - ballRadius / 2;
  ballY = 50;
  ballDY = random(2, 4);
  ballDX = random(-3, 3);
  ballX = width/2;
  topLimit = bubbleRadius / 2;
  bottomLimit = height - bubbleRadius / 2;
  bubbleTop = bubbleY - bubbleRadius / 2;
  sitting = true;
  bounceTarget = 5;
  scene = 1;
  let sceneMessage = 0;
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
    background(20, 50, 100);
    fill(255, 200, 255, 100);
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
      text("Wow!!!", windowWidth/2, windowHeight/2);
      sceneMessage++;
    }

 
    bubbleRadius = 70;
    ballRadius = 70;
    bounceTarget = 7;
    playLevel();
        
  }
  else if (scene === 3) {
    background(0, 30, 80);
    //ll(0, 50, 40);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 200, 255);
    text ("Under Repairs", width/2, height/2);
  }
}


function myBubble(){
  fill("yellow");
  circle(bubbleX, bubbleY, bubbleRadius);
}

function myBall(){
  fill(255, 255, 200, 180);
  circle(ballX, ballY, ballRadius + 10);
  fill("black");
  circle(ballX, ballY, ballRadius);
}

function miniBubbles(){
  for (let i = 0; i < 5; i++){
    let bx = random(width);
    let by = random(height);
    fill(255, 255, 255, 100);
    circle(bx, by, random(2, 5));
  }
}

function backScene(){
  for (let y = 0; y < height; y++){
    stroke(173, 216, 230, map(y, 0, height, 50, 200));
    line(0, y, width, y);
  }
}

function moveBall() {
  ballX += ballDX;
  ballY += ballDY;

  ballDX += random(-0.2, 0.2);
  ballDX = constrain(ballDX, -5, 5);
  // ballX += ballDX;

  if (ballX -ballRadius/2 < 0 || ballX + ballRadius/2 > windowWidth){
    ballDX *= -1;
  }
  if (ballY - ballRadius/2 < 0){
    ballDY *= -1;
  }

  if (ballY + ballRadius/2 >= windowHeight){
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

  bubbleX = constrain(bubbleX, bubbleRadius/2, windowWidth - bubbleRadius/2);
  bubbleY = constrain(bubbleY, bubbleRadius/2, windowHeight - bubbleRadius/2);
}

function checkWin(){
  if (ballY + ballRadius/2 >= height){
    scene ++;
    resetLevel();
  }
}

function resetLevel(){
  bubbleX = windowWidth/2;
  bubbleY = windowHeight - 150;

  ballX= windowWidth/2;
  ballY = 100;
  ballDX = random(-3, 3);
  ballDY = random(2, 4);

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

