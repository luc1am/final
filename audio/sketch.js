

/*

A short description (3-5+ sentences) sharing the following information:
  The goal/purpose of your project
  The entire loop through which someone would go through to interaction with your piece.
 (How does the sketch start initially?
 How/when does the user start interacting with the sketch?
 What steps does the user take until they are finished interacting with the sketch?
 Are there different options/possible paths for the user to take when interacting
    with this sketch?
 What happens when the loop/interaction is finished?)

The goal of this piece is to create a camping experience for the user.
This character will begin seated at the fire


previously used code from audio hw assignment
new content:
change into classes
make a character walk across

*/
var palette = {
  darkSienna: '#220901',
  blood: '#01172F',
  darkRed: '#941B0C',
  rust: '#BC3908',
  yellow: '#F6AA1C',
  almond: '#A7754D'
};


//draw logs
var logs = {
  length: 200,
  width: 50,
  color1: palette.darkSienna,
  color2: palette.almond,
  display: function(x,y,rot){
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    translate(x,y);
    rotate(rot);
    noStroke();
    fill(this.color1);
    rect(0,0,this.length, this.width);
    ellipse(0-(this.length)/2,0,20,this.width);
    fill(this.color2)
    ellipse((this.length)/2,0,20, this.width);
    pop();
  }
}

var mic;
var butt;//(button) for restart

function setup() {
  createCanvas(500,500);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(palette.blood);
  var intensity = mic.getLevel();
  fill(palette.almond)
  text("feed the flame by blowing on the mic", 100,100)
  //log in the back of flames
  logs.display(250,340,5);

  //print(intensity);
  //it works!!

  push();
  translate(250,350)
  translate(0,-50*intensity);
  scale(5*intensity,8*intensity*intensity);
  scale(intensity)
  flame(10,0,1.2)
  flame(-40,20,1.35)
  flame(-50,0,1.3)
  flame(-80,30,1)
  flame(30,30,1.25)
  flame(0,20, 1)
  flame(30,50,1)
  pop();

  logs.display(200,400,20);
  logs.display(300,380,170);

  //blew too hard, flame extinguished
  if (intensity>0.9){
    noLoop();
    background(palette.blood);
    logs.display(250,340,5);
    logs.display(200,400,20);
    logs.display(300,380,170);
    fill(palette.almond);
    text("the flame was extinguished... :(", 100,100);
    butt = createButton("try again");
    butt.position(100,150);
    butt.mousePressed(retry);
  }
}

//used p5 reference for this info
//https://p5js.org/reference/#/p5/curveVertex
//flame(bottom x, bottom y, size)
function flame(x,y, size){
  push();
  rectMode(CENTER)
  //adjust for displacement,
  translate(x-50,y-125);
  scale(size);
  stroke(255);
  fill(palette.yellow);
  beginShape();
  curveVertex(50,0);
  curveVertex(75,100);
  curveVertex(50,125);
  curveVertex(25,100);
  //not sure why, but repeating these vertices helped,
    //without it doesn't fill correctly
  curveVertex(50,0);
  curveVertex(75,100);
  curveVertex(50,125)
  endShape();
  pop();

  //smaller red flames
  push();
  translate(x-10,y-25);
  scale(0.5);
  fill(palette.rust)
  beginShape();
  curveVertex(50,0);
  curveVertex(75,100);
  curveVertex(50,125);
  curveVertex(25,100);
  curveVertex(50,0);
  curveVertex(75,100);
  curveVertex(50,125)
  endShape();
  pop();

}

function retry(){
  loop();
  removeElements();
}
