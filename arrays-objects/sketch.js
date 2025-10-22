// Project Title
// Ceberta Adum
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//Variables
//let myBubbles = [];
const hit = false;
const timerValue = 15;
let ballX;
let ballY;
let ballRadius;
let bubbleX;
let bubbleY;
let bubbleX2;
let bubbleY2;
let bubbleXTime;
let bubbleYTime;
let bubbleX2Time;
let bubbleY2Time;
let bubbleRadius;
let time;
let scene;
//let scene3;
const TIME_BUFFER = 1000;
let width;
let height;


function setup() {
  initializingVariables();
  createCanvas(width, height);
}

function draw() {
  background(220);
  //Button();
  myBall();
  //bubbleLoop();
  myBubble();
  moveBall();
  //playerKilled();
  Collisions();
  //changeScenes();
  //Timer();
}

//initializing variable
function initializingVariables(){
  width = windowWidth - 50;
  height = windowHeight -50;
  time = random(1000);
  scene = 0;
  //scene3 === false;
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
}

//Creating ball/player
function myBall(){
  fill("black");
  circle(ballX, ballY, ballRadius);
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

  //moving within boundary
  ballX = constrain(ballX, ballRadius/2 , width - ballRadius/2);
  ballY = constrain(ballY, ballRadius/2 , height - ballRadius/2);
};

//Collosion detection
function Collisions(){
  let d = dist(ballX, ballY, bubbleX2, bubbleY2);
  let d2 = dist(ballX, ballY, bubbleX, bubbleY);
  
  if (d < bubbleRadius/2 + ballRadius/2 || d2 < bubbleRadius/2 + ballRadius/2){
    text("Dead", width/2, height/2);
    textSize(25);
    fill(10);
  }
}

//Changing Scenes
function changeScenes(){
  if (scene === 0){
    startButton();
  }
  else if (scene === 1) {
    startGame();
  }
  // else if (scene === 3){
  //   playerKilled();
  // }
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
  text("Survive", width/2.5, height/1.3);
  textSize(25);
  fill(10);
}


//Setting a timer
function Timer(){
  if (timerValue <= 15) { 
    fill("black");
    text(timerValue + " seconds", width / 8, height / 6); 
  }

  if (timerValue > 0) { 
    timerValue--;
  }
 
  if (timerValue === 0) { 
    text('Times Up!', width / 8, height / 6 + 15); 
  }
}


//Setting a start button
function mousePressed(){
  if (scene === 0){
    if (mouseX === width/2.5){
      startPlay(); 
    }
  }
}

function startPlay(){
  scene === 1;
}