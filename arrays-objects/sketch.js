// Project Title
// Ceberta Adum
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




//Variables
let myBubbles = [];
const hit = false;
let timerValue = 20;
let lastTime = 0;
let ballX;
let ballY;
let ballRadius;
let bubbleX;
let bubbleY;
let time;
let scene;
let speedFactor;
const TIME_BUFFER = 1000;
let width;
let height;
let sizeFactor;
let lastSpawnTime = 0;
let safeDistance;


function setup() {
  createCanvas(windowWidth, windowHeight);
  initializingVariables();
}

function draw() {
  background(220);
  myBall();
  spawnBubble();
  myBubble();
  moveBall();
  Collisions();
  //changeScenes();
  Timer();
}

//initializing variable
function initializingVariables(){
  time = random(1000);
  scene = 0;
  speedFactor = 1;
  sizeFactor = 1;
  ballX = 50;
  ballY = 50;
  ballRadius = 50;
  bubbleX = 100;
  bubbleY = 100;
  bubbleX2 = 150;
  bubbleY2 = 150;
  bubbleXTime = 1000;
  bubbleYTime = 2000;
  bubbleX2Time = 5000;
  bubbleY2Time = 3000;
  bubbleRadius = random(50, 100);
  lastSpawnTime = 0;
  safeDistance = 100;
}

//Creating ball/player
function myBall(){
  fill("black");
  circle(ballX, ballY, ballRadius);
}

//creating more bubbles
function spawnBubble(){
  let x, y;
  let b = {
    x: x,
    y: y,
    radius: 20 + sizeFactor,
    dx: random(-2, 2) * speedFactor,
    dy: random(-2, 2) * speedFactor
  };
  myBubbles.push(b);
}

//Creating bubble/killer
function moveBubbles(){
  for (let b of myBubbles) {
    b.x += b.dx;
    b.y += b.dy;
    if (b.x - b.radius < 0 || b.x + b.radius> windowWidth){ 
      b.dx *= -1;
    }
    if (b.y - b.radius < 0 || b.y + b.radius > windowHeight){
      b.dy  *= -1;
    }
  }
}

//Creating bubble/killer
function myBubble(){
  fill("lightblue");
  noStroke();
  for (let b of myBubbles){
    ellipse(b.x, b.y, b.radius*2);
  }
};

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

  //moving within boundary
  ballX = constrain(ballX, ballRadius/2 , windowWidth - ballRadius/2);
  ballY = constrain(ballY, ballRadius/2 , windowHeight - ballRadius/2);
};

//Collosion detection
function Collisions(){
  for (let b of myBubbles){
    let d = dist(ballX, ballY, b.x, b.y);
    if (d < b.radius/2 + ballRadius/2){
      textSize(40);
      text("Dead", windowWidth/2, windowHeight/2);
      noLoop();
      //fill("red");
    }
  }
}

//Changing Scenes
function changeScenes(){
  if (scene === 1){
    moveBall();
    myBall();
    moveBubbles();
    myBubble();
    Collisions();
    Timer();
  } 
  else{
    startButton();
  }
}

// Start game defined
function startGame(){
  background("red");
  myBall();
  myBubble();
  //fill(150);
}

// Start button defined
function startButton(){
  background("lightblue");
  text("Survive", windowWidth/2.5, windowHeight/1.3);
  textSize(25);
  fill(10);
}


//Setting a timer
function Timer(){
  if (frameCount % 60 === 0 && timerValue > 0) {
    timerValue --;
    console.log(timerValue);
  }

  if (millis()-lastSpawnTime >= TIME_BUFFER && timerValue > 0) { 
    spawnBubble();
    speedFactor += 0.05;
    sizeFactor += 0.02;
    lastSpawnTime = millis(); 
  }
  if (timerValue <=0){
    textSize(40);
    fill("green");
    text("YOU SURVIVED!!, width/2, height/2");
    noLoop();
  }
  fill("black");
  textSize(30);
  textAlign(CENTER);
  text(timerValue, windowWidth/2, 30);
}

//Setting a start button
function mousePressed(){
  if (scene === 0){
    scene = 1;
    initializingVariables();
    // if (mouseX > width/2.5 - 50 && mouseX < width/2.5 + 100 &&
    //   mouseY > height/1.3 -30 && mouseY < height/1.3 + 30){
    //   scene =1; 
    // }
  }
}
