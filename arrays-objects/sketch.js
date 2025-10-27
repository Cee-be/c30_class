// Arrays and Objects
// Ceberta Adum
// 26th October, 2025
//
// Extra for Experts:
// - using class to program with objects 
// - using a micro:bit


//Variables
let myBubbles = [];
let timerValue = 15;
let lastTime = 0;
let width;
let height;
let gameOver;
let controlType;
let keyboardBtn;
let microbitBtn;
let player;
let cnv;
let b;
let safeDistance;
let serial;
let microbitData;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  initializingCanvas();
  initializingVariables();
  setupControls();
  spawnBubbles(15);
}

function draw() {
  background(100, 150, 200);
  textAlign(CENTER, CENTER);
  Choose();
}

//Choice
function Choose(){
  if (!controlType){
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Choose your control type:", width/2, height/2-60);
    return;
  }
  else{
    runGame();
    displayTimer();
  }
}

//initializing the canvas
function initializingCanvas(){
  screenDiv = document.getElementById("screen");
  width = screenDiv.offsetWidth;
  height = screenDiv.offsetHeight;
  cnv = createCanvas(width, height);
  cnv.parent("screen");
}

//initializing variable
function initializingVariables(){
  time = random(1000);
  player = new Ball(width/2, height/2);
  safeDistance = 70;
  gameOver = false;
}

//Control choice
function setupControls(){
  const keyboardBtn = select("#keyboard-btn");
  const microbitBtn = select("#microbit-btn");

  keyboardBtn.mousePressed(() => {
    controlType = "keyboard";
    startGame();
  });

  microbitBtn.mousePressed(() => {
    controlType = "microbit";
    startGame();
    initMicrobit();
  });
}

//Microbit setup
function initMicrobit(){
  serial = new p5.SerialPort();
  serial.on('connected', () => console.log("Serial connected"));
  serial.on('open', () => console.log("Serial port open"));
  serial.on("data", serialEvent);
}

//defining function in microbit setup
function serialEvent(){
  const data = serial.readLine();
  if (data) {
    microbitData = data.trim();
  }
}

//Starting the after choice made
function startGame(){
  document.getElementById("input-type").style.display = "none";
  gameOver = false;
  player.x = width/2;
  player.y = height/2;
  timerValue = 15;
  lastTime =millis();
}

//creating more bubbles
function spawnBubbles(num){
  for (let i =0; i< num; i++){
    let b;
    let tries = 0;
    do{
      b = new Bubble(random(width), random(height));
      tries++;
      if (tries > 100) {
        break;
      }
    } 
    while 
    (dist(b.x, b.y, player.x, player.y) < safeDistance);
    myBubbles.push(b);
  }
}

//Using class to create ball/player
class Ball{
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.r = 15;
    this.speed = 5;
  }

  update(){
    // moving ball/player with arrow keys
    if (controlType === "keyboard"){
      if (keyIsDown(UP_ARROW)) {
        this.y -= this.speed;
      } 
      if (keyIsDown(DOWN_ARROW)) {
        this.y += this.speed;
      } 
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= this.speed;
      } 
      if (keyIsDown(RIGHT_ARROW)) {
        this.x += this.speed;
      }
    }

    else if (controlType === "microbit"){
      if (microbitData === "UP") {
        this.y -= this.speed;
      } 
      if (microbitData === "DOWN") {
        this.y += this.speed;
      } 
      if (microbitData === "LEFT") {
        this.x -= this.speed;
      } 
      if (microbitData === "RIGHT") {
        this.x += this.speed;
      }
      microbitData = "";
    }

    //moving within boundary
    this.x = constrain(this.x, this.r/2 , width - this.r/2);
    this.y = constrain(this.y, this.r/2 , height - this.r/2);
  }

  //appearance
  display(){
    fill(100, 200, 255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

//Creating bubble/killer
class Bubble{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = random(30, 50);
    this.xSpeed = random(2, -2);
    this.ySpeed = random(2, -2);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < this.r || this.x > width - this.r) {
      this.xSpeed *= -1;
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.ySpeed *= -1;
    }
  }

  display(){
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(this.x, this.y, this.r *2);
  }
}


//Changing Scenes
function runGame(){
  if (!gameOver) {
    player.update();
    player.display();

    for (let bubble of myBubbles) {
      bubble.move();
      bubble.display();

      if (dist(player.x, player.y, bubble.x, bubble.y) < player.r + bubble.r){
        gameOver = true;
      }
    }

    //Show text
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Survive!", 10, 10);
  }
  else {
    fill(255, 80, 80);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("GameOver!", width/2, height/2);
    noLoop();
  }
}

//Setting a timer
function displayTimer(){
  if (frameCount % 60 === 0 && timerValue > 0) {
    timerValue --;
    console.log(timerValue);
  }
  if (timerValue <= 0 && !gameOver){
    textSize(20);
    fill("green");
    text("YOU SURVIVED!!", width/2, height/2);
    noLoop();
  }
  fill("black");
  textSize(30);
  textAlign(CENTER);
  text(timerValue, width/2, 30);
}