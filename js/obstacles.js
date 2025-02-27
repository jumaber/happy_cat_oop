class Obstacles {
    constructor(gameScreen, type, speed){
        // Store a reference to the game screen container for positioning and appending the obstacle
        this.gameScreen = gameScreen; 
        // 'type' defines whether the obstacle is a fish (for points) or a bomb (for game over)
        this.type = type; 
        // 'speed' determines how many pixels the obstacle will fall per update (its falling speed)
        this.speed = speed; 
        // Randomize the horizontal starting position within the game screen,
        // subtracting 50 to account for the obstacle's width so it doesn't overflow.
        this.positionX = Math.random() * (gameScreen.offsetWidth - 50); 
        // Set the initial vertical position; here, 150 means the obstacle starts off-screen
        // or near the top depending on your design.
        this.positionY = 150; 

        // Create the DOM element that represents the obstacle
        this.element = document.createElement("img");
        // Use absolute positioning so that the obstacle can be positioned precisely within the gameScreen
        this.element.style.position = "absolute";
        // Set the horizontal position of the element based on the randomized value
        this.element.style.left = this.positionX + "px";
        // Set the vertical position of the element based on the starting position
        this.element.style.top = this.positionY + "px";
        // Set the image source based on the obstacle type:
        // if type is "fish", use the fish image; otherwise, use the bomb image.
        this.element.src = this.type === "fish" ? "img/fish.svg" : "img/bomb.svg";
    }

    // spawn(): Adds the obstacle's DOM element to the game screen.
    spawn(){
        this.gameScreen.appendChild(this.element); // Append the element so it's visible in the game
        console.log("Obstacles spawned:" + this.type);
    }

    // fall(): Updates the vertical position of the obstacle on each frame.
    // Returns false if the obstacle has fallen off-screen (so it can be cleaned up), true otherwise.
    fall(){
        // Increase the vertical position by the speed value
        this.positionY += this.speed;
        // Update the element's 'top' CSS property to reflect the new vertical position
        this.element.style.top = this.positionY + "px";
        console.log("Obstacle Y:", this.positionY, "Screen Height:", this.gameScreen.offsetHeight);

        // If the obstacle's vertical position exceeds the game screen's height,
        // it has fallen off-screen. Remove the DOM element and return false.
        if (this.positionY > this.gameScreen.offsetHeight) {
            this.element.remove();
            console.log("Obstacle removed");
            return false;
        }
        // Otherwise, return true to indicate the obstacle is still active
        return true;
    }

    // collide(obstacle): Checks if the obstacle has collided with the cat.
   collide(cat) {
    // Get the bounding rectangles of the cat and this obstacle
    const catRect = cat.element.getBoundingClientRect();
    const obsRect = this.element.getBoundingClientRect();



    // Basic AABB collision detection
    if (
        catRect.left < obsRect.right &&
        catRect.right > obsRect.left &&
        catRect.top < obsRect.bottom &&
        catRect.bottom > obsRect.top
    ) {
        // Collision detected: remove this obstacle from the DOM
        this.element.remove();

        const clickSound = document.getElementById("click-sound");
        clickSound.play();
        console.log("Collision detected: obstacle removed");
        return true;
    }
    return false;
}

}
