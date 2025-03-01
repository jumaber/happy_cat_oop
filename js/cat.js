class Cat {
    constructor(gameScreen, type, left = 650, width = 160, height = 160, top = 400) {
        // Store a reference to the game screen container
        this.gameScreen = gameScreen;
        // The type of cat selected ("dia" or "nit"), which may affect appearance and properties
        this.type = type;
        // Initial horizontal position (left side) of the cat
        this.positionX = left;
        // Dimensions for the cat's image; these may be controlled by CSS later, but here they're set in JS
        this.width = width;
        this.height = height;
        // The vertical position (top) where the cat should appear on the screen
        this.top = top;
        // A property to track horizontal movement velocity (not used for discrete key presses but useful for smooth movement)
        this.directionX = 0;

        // Create an image element to visually represent the cat
        this.element = document.createElement("img");
        // Use absolute positioning so we can set exact coordinates on the game screen
        this.element.style.position = "absolute";
        // Set the initial horizontal position using the positionX value
        this.element.style.left = this.positionX + "px";
        // Set the dimensions of the cat image
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        // Set the vertical position using the top value
        this.element.style.top = this.top + "px";
    }
  
    // move(pixels): Moves the cat horizontally by the given pixel amount
    move(pixels) {
        // Update the cat's position by adding the movement amount
        this.positionX += pixels;

        // Define the maximum allowed horizontal position so the cat doesn't go off-screen.
        // This is the game screen's width minus the cat's width.
        const maxPosition = this.gameScreen.offsetWidth - this.width;
        // If the new position is less than 0, clamp it to 0 (left boundary)
        if (this.positionX < 0) {
            this.positionX = 0;
        }
        // If the new position exceeds the right boundary, clamp it to maxPosition
        else if (this.positionX > maxPosition) {
            this.positionX = maxPosition;
        }

        // Update the cat's image based on the direction of movement.
        // If moving left (pixels is negative), set the left-moving image.
        // Otherwise, set the default image for moving right.
        if (pixels < 0) {
            this.element.src = this.type === "dia" ? "img/dia_move_left.svg" : "img/nit_move_left.svg";
        } else {
            this.element.src = this.type === "dia" ? "img/dia_move_right.svg" : "img/nit_move_right.svg";
        }

        // Call renderCat() to update the DOM element's position based on the new state
        this.renderCat();
    }
       

    // renderCat(): Updates the visual position of the cat element on the screen.
    renderCat() {
        // Set the left style property to reflect the updated horizontal position
        this.element.style.left = this.positionX + "px";
        console.log("Cat Rendered");
    }

    // collect(): Placeholder for logic when the cat collects an item (like fish)
    collect() {
        console.log("Collected Points");
    }

    // reset(): Placeholder for logic to reset the cat's state between game sessions
    reset() {
        console.log("Cat Reseted");
    }

    // updateCat(): Placeholder for updating the cat's state on each game loop iteration.
    // You might include boundary checking or other dynamic updates here.
    updateCat() {
        console.log("Cat's boundaries and dynamic properties have been updated");
    }
}
