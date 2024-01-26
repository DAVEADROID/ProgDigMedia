let drawingColor = [255, 0, 0];

function setup() {
  createCanvas(750, 500);
  stroke('white');
  
  createColorButton('red', 0);
  createColorButton('orange', 25);
  createColorButton('yellow', 50);
  createColorButton('lime', 75);
  createColorButton('cyan', 100);
  createColorButton('blue', 125);
  createColorButton('magenta', 150);
  createColorButton('brown', 175);
  createColorButton('white', 200);
  createColorButton('black', 225);
  
  background(220);
  frameRate(300);
}

function draw() {
  if (mouseIsPressed) {
    stroke(drawingColor);
    strokeWeight(5);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function createColorButton(color, yPos) {
  let button = createDiv();
  button.position(0, yPos);
  button.size(25, 25);
  button.style('background-color', color);
  button.style('border', '1.5px solid white');
  button.mousePressed(function () {
    changeColor(color);
  });
}

function changeColor(color) {
  switch (color) {
    case 'red':
      drawingColor = [255, 0, 0];
      break;
    case 'orange':
      drawingColor = [255, 165, 0];
      break;
    case 'yellow':
      drawingColor = [255, 255, 0];
      break;
    case 'lime':
      drawingColor = [0, 255, 0];
      break;
    case 'cyan':
      drawingColor = [0, 255, 255];
      break;
    case 'blue':
      drawingColor = [0, 0, 255];
      break;
    case 'magenta':
      drawingColor = [255, 0, 255];
      break;
    case 'brown':
      drawingColor = [165, 42, 42];
      break;
    case 'white':
      drawingColor = [255, 255, 255];
      break;
    case 'black':
      drawingColor = [0, 0, 0];
      break;
    default:
      drawingColor = [255, 0, 0];
  }
}
