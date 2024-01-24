function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('rgb(255,255,255)');
  let c = color(0,255,0);
  fill(c);
  stroke('white');
  strokeWeight(1);
  rect(15,10,150,75)
  stroke('black');
  strokeWeight(1);
  const x = color(255,255,255);
  fill(x);
  square(100, 20, 55);
  circle( 55,47,60);
  describe('Example 1 circle and sqaure in green box');
  
  noStroke();
  
  fill(255,0,0,100);
  circle( 250,47,60);
  fill(0,255,0,100);
  circle(270,77,60);
  fill(0,0,255,100);
  circle( 230,77,60);
  
  fill(0,0,0);
  rect(15,100,150,75);
  fill(255,255,0)
  circle(55,137,60)
  fill(0,0,0)
  triangle(25,170,25,100,55,137)
  fill(255,0,0)
  arc(128, 135,60,55, PI,0, OPEN);
  rect(98,134,60,33)
  fill(255,255,255)
  circle(115,137,17)
  circle(143,137,17)
  fill(0,0,255)
  circle(115,137,10)
  circle(143,137,10)
  
  fill(0,0,127)
  square(15,190,100)
  fill(0,127,0)
  stroke(255,255,255)
  strokeWeight(2.5)
  circle (65,239,50)
  fill(255,0,0)
  translate(35,210);
  scale(0.15);
  stroke(255,255,255)
  strokeWeight(13)
  beginShape();
  vertex(200, 50);
  vertex(245, 150);
  vertex(350, 150);
  vertex(265, 225);
  vertex(300, 325);
  vertex(200, 280);
  vertex(100, 325);
  vertex(140, 225);
  vertex(50, 150); 
  vertex(160, 150);
  endShape();
  noStroke();
  fill(255,255,255);
  rotate(PI / 9.0)
  rect(190, -23, 15, 109);

}