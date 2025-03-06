class Cat {
  constructor(gameScreen, type) {
    // Keep references to the game screen and cat type
    this.gameScreen = gameScreen;
    this.type = type;

    this.widthPercent = 10; // The cat will be 10% of the game screen width
    // (Optionally define a heightPercent the same way, or use auto height.)

    // Horizontal position as a percentage. 50% = center
    this.positionXPercent = 45;
    this.positionYPercent = 50;
    this.direction = "left";


    // Property controling the steps (speed) of the cat
    this.steps = 1;

    // Create the cat’s <img> element
    this.element = document.createElement("img");
    this.element.style.position = "absolute";

    // Start with a default cat image
    if (this.type === "dia") {
      this.element.src = "img/dia_default_left.svg";
    } else {
      this.element.src = "img/nit_default_left.svg";
    }

    // Position of the cat vertically
    this.element.style.top = "50%";

    // Set the cat’s initial left and width (in percentages)
    this.updateCatStyles();

    // get reference to your move-cat-sound:
    this.moveSound = document.getElementById("move-cat-sound");
  }

  // Apply the current this.positionXPercent and this.widthPercent
  updateCatStyles() {
    // Cap the cat's X% between 0% and (100% - widthPercent)
    // so it never goes off the right edge.
    if (this.positionXPercent < 0) {
      this.positionXPercent = 0;
    }
    const maxX = 100 - this.widthPercent;
    if (this.positionXPercent > maxX) {
      this.positionXPercent = maxX;
    }

    // Convert the percentages to strings for CSS
    this.element.style.left = this.positionXPercent + "%";
    this.element.style.width = this.widthPercent + "%";

    // Scale can't height automatically:
    this.element.style.height = "auto";
  }

  // Move left in percentage terms
  moveLeft() {
    this.direction = "left";
    // For example, move left by 5% each time
    this.positionXPercent -= this.steps;
    if (this.moveSound) {
      this.moveSound.play();
    }
    // Update the cat sprite
    this.element.src =
      this.type === "dia" 
      ? "img/dia_move_left.svg" 
      : "img/nit_move_left.svg";

    // Re-apply styles with the new position
    this.updateCatStyles();
  }

  // Move right in percentage terms
  moveRight() {
    this.direction = "right";

    // Move right by 5%
    this.positionXPercent += this.steps;
    if (this.moveSound) {
      this.moveSound.play();
    }
    // Update the cat sprite
    this.element.src =
      this.type === "dia" 
      ? "img/dia_move_right.svg" 
      : "img/nit_move_right.svg";

    // Re-apply styles with the new position
    this.updateCatStyles();
  }

handleKeyDown(key) {
  if (key === "ArrowLeft") this.moveLeft();
  else if (key === "ArrowRight") this.moveRight();
}


handleKeyUp(key) {
  if (key === "ArrowLeft") {
    this.element.src = this.type === "dia"
      ? "img/dia_default_left.svg"
      : "img/nit_default_left.svg";
  } else if (key === "ArrowRight") {
    this.element.src = this.type === "dia"
      ? "img/dia_default_right.svg"
      : "img/nit_default_right.svg";
  }
}

jump() {
  console.log("Jump! Current direction:", this.direction);

  this.element.classList.add("cat-animation");
  setTimeout(() => {
    this.element.classList.remove("cat-animation");
  }, 1000);

  if (this.direction === "right") {
    this.element.src = this.type === "dia"
      ? "img/dia_default_right.svg"
      : "img/nit_default_right.svg";
  } else {
    this.element.src = this.type === "dia"
      ? "img/dia_default_left.svg"
      : "img/nit_default_left.svg";
  }
}


  }

