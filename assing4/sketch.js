let bugs = [];
let squishedBugImage;
let timer = 30;
let deadBugs = 0; // Variable to keep track of dead bugs

function preload() {
  // Load images
  squishedBugImage = loadImage('assets/squished_bug.png');
}

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug());
  }
}

function draw() {
  // Set a black background
  background(255);

  // Display timer
  textSize(20);
  fill(0); // Set fill color to black
  text(`Time: ${timer}`, 10, 30);

  // Display "Dead BUGS" instead of "Score"
  textSize(20);
  fill(0); // Set fill color to black
  text(`Dead BUGS: ${deadBugs}`, 10, 60);

  // Update and display bugs
  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].update();
    bugs[i].display();

    // Check for squishing
    if (bugs[i].isMouseOver() && mouseIsPressed && !bugs[i].isSquished()) {
      bugs[i].squish();
    }

    // Remove squished bugs after 3 seconds
    if (bugs[i].isSquished() && bugs[i].getSquishTime() + 3 < frameCount) {
      bugs.splice(i, 1);
      bugs.push(new Bug()); // Add a new bug to replace the squished one
    }

    // Remove bugs that have moved off the screen
    if (bugs[i].isOffScreen()) {
      bugs.splice(i, 1);
      bugs.push(new Bug()); // Add a new bug to replace the off-screen one
    }
  }

  // Update timer
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }

  // End the game when the timer reaches 0
  if (timer === 0) {
    textSize(32);
    fill(0); // Set fill color to black
    text('Game Over', width / 2 - 100, height / 2);
    noLoop(); // Stop the draw loop
  }
}

class Bug {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = random(1, 3);
    this.angle = random(TWO_PI);
    this.spriteSheet = loadImage('assets/bug.png');
    this.frameWidth = 30;
    this.frameHeight = 30;
    this.currentFrame = 0;
    this.frameCount = 2;
    this.rows = 2;
    this.squished = false;
    this.squishTime = 0;
  }

  update() {
    if (!this.squished) {
      // Move the bug, and increase speed based on deadBugs
      this.x += this.speed * cos(this.angle) * (1 + 0.1 * deadBugs);
      this.y += this.speed * sin(this.angle) * (1 + 0.1 * deadBugs);

      // Change direction randomly
      if (random() < 0.01) {
        this.angle = random(TWO_PI);
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    // Rotate the bug based on its movement direction
    if (!this.squished) {
      rotate(this.angle + HALF_PI);
    }

    // Calculate the position in the sprite sheet
    let frameX = (this.currentFrame % this.frameCount) * this.frameWidth;
    let frameY = floor(this.currentFrame / this.frameCount) * this.frameHeight;

    // Display the bug image from the sprite sheet
    image(
      this.squished ? squishedBugImage : this.spriteSheet,
      -15,
      -15,
      30,
      30,
      frameX,
      frameY,
      this.frameWidth,
      this.frameHeight
    );

    pop();

    // Update the current frame for animation
    if (frameCount % 5 === 0) {
      this.currentFrame = (this.currentFrame + 1) % (this.frameCount * this.rows);
    }
  }

  isMouseOver() {
    // Check if the mouse is over the bug
    return (
      mouseX > this.x - 15 &&
      mouseX < this.x + 15 &&
      mouseY > this.y - 15 &&
      mouseY < this.y + 15
    );
  }

  isOffScreen() {
    // Check if the bug has moved off the screen
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }

  squish() {
    this.squished = true;
    this.squishTime = frameCount;
    deadBugs++; // Increment deadBugs when a bug is squished
    this.speed *= 1.1; // Increase speed of bugs when a bug is squished
  }

  isSquished() {
    return this.squished;
  }

  getSquishTime() {
    return this.squishTime;
  }
}
