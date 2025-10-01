// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let someTime = 2000;
let redTime = 4000;
let yellowTime = 4000;
let greenTime = 4000;
let lightColor = "yellow";

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  //blinkingLights();
  showCorrectLight();
  updateLightState();
}

function updateLightState(){
  if (lightColor === "red" && millis() > lastSwitched + redTime) {
    lightColor = "green";
    lastSwitched = millis();
  }
  else if (lightColor === "green" && millis() > lastSwitched + yellowTime) {
    lightColor = "yellow";
    lastSwitched = millis();
  }
  else if (lightColor === "yellow" && millis() > lastSwitched + greenTime) {
    lightColor = "red";
    lastSwitched = millis();
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

// function blinkingLights(){
//   if (millis() < someTime) {
//     fill("red");
//     ellipse(width/2, height/2 - 65, 50, 50); //top
//   }
//   else if (millis() === someTime){
//     fill("yellow");
//     ellipse(width/2, height/2, 50, 50); //middle
//   }
//   else{
//     fill("green");
//     ellipse(width/2, height/2 + 65, 50, 50); //bottom
//   }
//   console.log(millis);
// }

function showCorrectLight(){
  if (lightColor === "red") {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }

  else if (lightColor === "yellow") {
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }

  else if (lightColor === "green") {
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
}