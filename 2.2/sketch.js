const synth = new Tone.Synth().toMaster();
const reverb = new Tone.Reverb(2).toMaster();
const filter = new Tone.Filter(200, "lowpass").connect(reverb);
synth.connect(filter);

const keyMappings = {
  a: "C4",
  s: "D4",
  d: "E4",
  f: "F4",
  g: "G4",
  h: "A4",
  j: "B4",
  k: "C5",
  l: "D5",
};

let filterFrequency = 200;
let reverbMix = 0.5;

function setup() {
  createCanvas(400, 260);
  background(240);

  // Draw piano keys with rainbow colors
  const keyWidth = width / Object.keys(keyMappings).length;
  for (let i = 0; i < Object.keys(keyMappings).length; i++) {
    const key = Object.keys(keyMappings)[i];
    const x = i * keyWidth;
    const keyColor = color(map(i, 0, Object.keys(keyMappings).length - 1, 0, 255), 100, 100);
    fill(keyColor);
    rect(x, 0, keyWidth, height - 60);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(key.toUpperCase(), x + keyWidth / 2, (height - 60) / 2);
  }

  createP("Filter Frequency").position(20, 300);
  createSlider(100, 1000, filterFrequency, 10).position(20, 350).input(updateFilterFrequency);
  createP("Reverb Mix").position(200, 300);
  createSlider(0, 1, reverbMix, 0.01).position(200, 350).input(updateReverbMix);

  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Press keys A to L to play notes!", width / 2, height / 2 - 20);
}

function draw() {
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Press keys A to L to play notes!", width / 2, height / 2 - 20);
}

function keyPressed() {
  const note = keyMappings[key];
  if (note) {
    synth.triggerAttack(note);
  }
}

function keyReleased() {
  const note = keyMappings[key];
  if (note) {
    synth.triggerRelease();
  }
}

function updateFilterFrequency() {
  filterFrequency = this.value();
  filter.frequency.value = filterFrequency;
}

function updateReverbMix() {
  reverbMix = this.value();
  reverb.wet.value = reverbMix;
}
