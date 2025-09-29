//Interactive Scene Assignment
//Ceberta Adum
//date

//
//

let scene1 = true;
let scene2 = false;
let y;
let x;
let velY;
let accY;
let radius;
let topLimit;
let bottomLimit;
let ballBottom;
let moonTop;

function setup() {
  createCanvas(windowWidth, windowHeight);
  moonY = windowHeight/6;
  ballY = windowHeight/6;
  x = windowWidth/2;
  radius = 200;
  velY = 1;
  accY = 1;
  topLimit = radius/1.5;
  bottomLimit = height - radius - 30;
}

function draw() {
  background("lightblue");
  changeScene();
  fill("black");
  dropBall();
}



function dropBall(){
  velY += accY;
  ballY += velY;
  
  let ballBottom = ballY + radius/10;
  let moonTop = moonY - radius/2;
  
  if (ballBottom >= moonTop) {
    ballY = moonTop - radius/10;
    velY = 0;
  }
  
  if (velY === 0){
    ballY = moonY - radius/12 - radius/ 10;
  }
  
  if (ballY > bottomLimit) {
    ballY = bottomLimit;
    velY = -0.8;
  }
  if (ballY < topLimit) {
    ballY = topLimit;
    velY = -0.8;
  }
  
  circle(x, ballY+35, radius/4);
}

function changeScene(){
  if (scene1 === true){
    crescentMoon();
    dropBall();
  }
  else if (scene2 === true) {
    background("green");
  }
}

function keyPressed() {
  if (scene1 === true){
    if (keyCode === RIGHT_ARROW) {
      scene2 = true;
    }
    scene1 = false;
  } 
}

function crescentMoon(){
  stroke("black");
  strokeWeight(4);
  line(x - 50, 0, x - 50, moonY);
  
  //yellow moon
  fill("yellow");
  stroke("lightblue");
  circle(x-30, moonY+12, radius);
  
  //Overlap
  stroke("lightblue");
  fill("lightblue");
  circle(x, moonY, radius-20);
}

function mouseWheel(event){
  if (event.delta < 0){
    
    moonY += 2;
  }
  else {
    moonY -= 2;
  }
  moonY = constrain(moonY, topLimit, bottomLimit);
}

