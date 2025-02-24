class Game {
    constructor(){
        // Screen Controls: Get references to the main game screens
        this.gameIntroScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        
        // Game objects: initially no cat is selected and obstacles array is empty
        this.cat = null;
        this.obstacles = [];
        
        // Dimensions: Set the game screen dimensions to the window size
        this.height = window.innerHeight;
        this.width = window.innerWidth;

        // Score: Initialize score to 0 and get reference to the score display element
        this.score = 0;
        this.scoreHTML = document.getElementById("hearts-score");
        
        // Game control settings: initialize state and variables for the game loop
        this.gameIsOver = false;
        this.gameIntervalId; // will hold the ID for the game loop interval
        this.gameLoopFrequency = 1000 / 60; // roughly 60 frames per second (16.67 ms per frame)
        
        // Spawn Rate: Define how frequently obstacles are spawned (in milliseconds)
        this.spawnRate = 1500; // spawn an obstacle every 1000 ms (1 second)
    }

    // start(): Prepares the game screen and starts the game loop and obstacle spawner
    start(){
        // Set the dimensions of the game screen
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;

        // Hide the intro screen and display the game screen
        this.gameIntroScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        // Start the game loop (updates run 60 times per second)
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);

        // Start spawning obstacles at intervals defined by spawnRate
        this.obstacleSpawnInterval = setInterval(() => {
            this.spawnObstacle();
        }, this.spawnRate);

        console.log("Game Started");
    }

    // gameLoop(): Called repeatedly; updates game state and checks for game over conditions
    gameLoop(){
        this.update();

        // If the game is over, clear both intervals (game loop and obstacle spawning)
        if(this.gameIsOver) {
            clearInterval(this.gameIntervalId);
            clearInterval(this.obstacleSpawnInterval);
        }
        console.log("Game Looped");
    }

    // update(): Updates game objects (cat and obstacles) for each frame
    update() {
        // Update the cat's state if it exists
        if (this.cat) {
            this.cat.updateCat();
        }
       // Update each obstacle and only keep those that are still active
        this.obstacles = this.obstacles.filter(obstacle => obstacle.fall());
        console.log("Update Running");

        this.obstacles = this.obstacles.filter(obstacle => {
        if (this.cat && obstacle.collide(this.cat, obstacle)) {
            // If a collision occurs, remove the obstacle from the array
            return false;
        }
        return true;
    });

    }

    // catSelect(selection): Initializes the cat based on player's selection ("dia" or "nit")
    catSelect(selection){
        if(selection === "dia"){
            this.cat = new Cat(this.gameScreen, "dia");
            // Set the initial cat image for Dia
            this.cat.element.src = "img/dia_happy_left.svg";
        }
        else if(selection === "nit"){
            this.cat = new Cat(this.gameScreen, "nit");
            // Set the initial cat image for Nit
            this.cat.element.src = "img/nit_happy_left.svg"; 
        }

        // Append the cat's DOM element to the game screen
        this.gameScreen.appendChild(this.cat.element);
        
        console.log("Cat Selected:" + selection);
    }

    // spawnObstacle(): Creates and spawns a new obstacle (fish or bomb) based on weighted randomness
    spawnObstacle() {
        // Define possible obstacle types
        const types = ["fish", "bomb"];
        // Use weighted randomness: for example, 20% chance for bomb, 80% chance for fish
        let randomValue = Math.random();
        let randomType = randomValue < 0.2 ? "bomb" : "fish"; 
        // Calculate a falling speed for the obstacle (adjust range as needed)
        const speed = Math.random() * 3 + 1; // Speed between 1 and 4 px per frame
        console.log("Calculated speed:", speed);

        // Create a new obstacle instance (passing gameScreen, type, and speed)
        const obstacle = new Obstacles(this.gameScreen, randomType, speed);

        // Append the obstacle's element to the game screen
        obstacle.spawn();

        // Add the new obstacle to the obstacles array for updating in the game loop
        this.obstacles.push(obstacle);
        console.log("Obstacles Spawned");
    }
    
    // collectPoints(): (Placeholder) Handles logic when points are collected
    collectPoints(){
        console.log("Points Collected");
    }

    // displayPoints(): (Placeholder) Updates the score display on the screen
    displayPoints(){
        console.log("Points Displayed");
    }

    // gameOver(): (Placeholder) Handles game over logic
    gameOver(){
        console.log("Game Over");
    }

    // gameWon(): (Placeholder) Handles game win logic
    gameWon(){
        console.log("Winner!");
    }
}
