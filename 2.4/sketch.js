// sketch.js

let drawingColor = [255, 0, 0];
let colorSounds = {
  'red': 'C4',
  'orange': 'D4',
  'yellow': 'E4',
  'lime': 'F4',
  'cyan': 'G4',
  'blue': 'A4',
  'magenta': 'B4',
  'brown': 'C5',
  'white': 'D5',
  'black': 'E5'
};
let synth;
let isDrawing = false;
let drawingSound;
let sequence;

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

  Tone.start();
  synth = new Tone.Synth().toDestination();

  sequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, '8n', time);
  }, ['C4', 'E4', 'G4', 'C5']).start(0);
  Tone.Transport.start();
}

function draw() {
  if (isDrawing && mouseIsPressed) {
    stroke(drawingColor);
    strokeWeight(10);
    line(pmouseX, pmouseY, mouseX, mouseY);
    playDrawingSound();
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
    playColorSound(color);
    startDrawingSound();
  });
}

function changeColor(color) {
  drawingColor = color;
}

function playColorSound(color) {
  let key = colorSounds[color];
  synth.triggerAttackRelease(key, '5s');
}

function startDrawingSound() {
  isDrawing = true;
}

function stopDrawingSound() {
  isDrawing = false;
}
function playDrawingSound() {
  let time = '8n'; 
  let pitch = 'C6';
  synth.triggerAttackRelease(pitch, time);
}