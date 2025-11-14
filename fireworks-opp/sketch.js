// Fireworks demo

class Particle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-7, 7);
    this.dy = random(-7, 7);
    this.radius =2;
    this.r = 205;
    this.g = 110;
    this.b = 255;
    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.b, this.g, this.opacity);
    circle(this.x, this.y, this.radius * 2);
  }

  update(){
    //move
    this.x += this.dx;
    this.y += this.dy;

    //fade away
    this.opacity--;
  }

  isDead(){
    return this.opacity <= 0;
  }
}

const NUMBER_OF_FIREWORKS_PER_CLICK = 100;
let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");

  for (let aFirework of theFireworks){
    if (aFirework.isDead()){
      //get rid of it
      let index = theFireworks.indexOf(aFirework);
      theFireworks.splice(index, 1);
    }
    else{
      aFirework.update();
      aFirework.display();
    }
  }
}

function mousePressed(){
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++){
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}