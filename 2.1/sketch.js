// sketch.js
let button1, button2, button3, button4;
let player1, player2, player3, player4;
let reverb;

function setup() {
    createCanvas(400, 200).parent('sketch-container'); // Attach canvas to the div
    noCanvas(); // Hide the canvas (since we're not drawing anything)

    // Load audio samples
    player1 = new Tone.Player("assets/sample1.mp3").toDestination();
    player2 = new Tone.Player("assets/sample2.mp3").toDestination();
    player3 = new Tone.Player("assets/sample3.mp3").toDestination();
    player4 = new Tone.Player("assets/sample4.mp3").toDestination();

    // Create buttons for each sample
    button1 = createButton('Game Over');
    button1.mousePressed(() => player1.start());

    button2 = createButton('Dog Bark');
    button2.mousePressed(() => player2.start());

    button3 = createButton('Coin');
    button3.mousePressed(() => player3.start());

    button4 = createButton('loud Wind');
    button4.mousePressed(() => player4.start());

    // Create a reverb effect
    reverb = new Tone.Reverb().toDestination();
    reverb.wet.value = 0.5; // Control the effect intensity

    // Connect players to the effect
    player1.connect(reverb);
    player2.connect(reverb);
    player3.connect(reverb);
    player4.connect(reverb);

    // Create a delay effect
const delay = new Tone.FeedbackDelay({
    delayTime: 0.3, // Adjust the delay time (in seconds)
    feedback: 0.5, // Set the feedback level (0 to 1)
  }).toDestination();
  
  // Connect players to the delay effect
  player1.connect(delay);
  player2.connect(delay);
  player3.connect(delay);
  player4.connect(delay);
  
  // Create a button to toggle the delay effect
  const delayButton = createButton('Toggle Delay');
  delayButton.mousePressed(() => {
    if (delay.wet.value === 0) {
      delay.wet.value = 0.5; // Enable the delay effect
    } else {
      delay.wet.value = 0; // Disable the delay effect
    }
  });
  
}
