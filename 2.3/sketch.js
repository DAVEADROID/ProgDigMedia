let noiseSynth;

function setup() {
  createCanvas(400, 400);

  // Create a noise synthesizer
  noiseSynth = new Tone.NoiseSynth({
    volume: -20, // reduce the volume to avoid clipping
    envelope: {
      attack: 0.001,
      decay: 0.1,
      sustain: 0.1,
      release: 0.5
    }
  }).toDestination();

  // Start Tone.js
  Tone.start();

  // Create an image that acts as a button
  let imgButton = createImg('hands.jpeg', 'Clap');
  imgButton.position(20, 20);
  imgButton.mousePressed(clapSound);
}

function draw() {
  // Draw something on the canvas if needed
}

function clapSound() {
  // Trigger the clapping noise
  noiseSynth.triggerAttackRelease("16n");
}
