// Basic OOP Syntax demo

class Dog{
  constructor(name){
    this.age = 0;
    this.name = name;
  }

  bark(){
    console.log(this.name + " says woof!");
  }
}

let fido = new Dog("fido");
let snoopy = new Dog("snoppy");

function setup() {
  createCanvas(windowWidth, windowHeight);
  fido.bark();
  snoopy.bark();
}

function draw() {
  background(220);
}
