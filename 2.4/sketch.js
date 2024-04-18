/// sketch.js

let drawingColor = 'red'; // Default color
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
let sequence;
let initialNoteArray = ['C4']; // Initial sequence
let noteArray = initialNoteArray.slice(); // Copy of initial sequence

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
  
  createClearButton('Clear', 250);
  
  background(220);
  frameRate(300);

  Tone.start();
  synth = new Tone.Synth().toDestination();

  sequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, '8n', time);
  }, noteArray);
  Tone.Transport.start();
}

function draw() {
  if (isDrawing && mouseIsPressed) {
    stroke(color(drawingColor));
    strokeWeight(10);
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
    playColorSound(color);
    addToSequence(color);
    startDrawingSound();
  });
}

function createClearButton(label, yPos) {
  let button = createButton(label);
  button.position(0, yPos);
  button.mousePressed(function () {
    clearCanvas();
    playClearSound();
  });
}

function changeColor(color) {
  drawingColor = color;
}

function playColorSound(color) {
  let key = colorSounds[color];
  synth.triggerAttackRelease(key, '5s');
}

function addToSequence(color) {
  let key = colorSounds[color];
  noteArray.push(key);
  sequence.dispose(); // Clear current sequence
  sequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, '8n', time);
  }, noteArray);
}

function startDrawingSound() {
  isDrawing = true;
}

function mousePressed() {
  sequence.start();
}

function mouseReleased(){
  sequence.stop();
}

function clearCanvas() {
  clear();
  background(220);
  noteArray = initialNoteArray.slice(); // Reset noteArray to initial state
  sequence.dispose(); // Delet the current sequence
  sequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, '8n', time);
  }, noteArray);
}

function playClearSound() {
  let beep = new Tone.Synth().toDestination();
  beep.triggerAttackRelease('G5', '8n');
}
