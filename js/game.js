class Game {
    constructor(){
        // Screen Controls: Get references to the main game screens
        this.gameIntroScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        
        // Audios Involved in more than one method:
        this.playGameSong = document.getElementById("play-game-song");

        // Game objects: initially no cat is selected and obstacles array is empty
        this.cat = null;
        this.obstacles = [];
        
        // Dimensions: Set the game screen dimensions to the window size
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        
        // Game control settings: initialize state and variables for the game loop
        this.gameIsOver = false;
        this.gameIntervalId; // will hold the ID for the game loop interval
        this.gameLoopFrequency = 1000 / 60; // roughly 60 frames per second (16.67 ms per frame)
        this.isPaused = false;

        // Spawn Rate: Define how frequently obstacles are spawned (in milliseconds)
        this.spawnRate = 1500; // spawn an obstacle every 1000 ms (1 second)

        // Score: Initialize score to 0 and get reference to the score display element
        this.score = 0; // Each fish is +1 point. With 25 points the user has won
        this.scoreHTML = document.getElementById("hearts-score");
        this.previousFilledCount = 0; // Initialize previous filled heart count

    }
    

    // start(): Prepares the game screen and starts the game loop and obstacle spawner
    start(){
        // Set the dimensions of the game screen
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;

        // Hide the intro screen and display the game screen
        this.gameIntroScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        // Sets the music in the background
        const gameStartSound = document.getElementById("game-start-sound");
        const introSong = document.getElementById("intro-song"); // repeated const. Maybe import?

        introSong.pause();
        gameStartSound.play();
        
        setTimeout(() => {
            this.playGameSong.play();
            this.playGameSong.volume = 0.3;
        }, 300);


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
    if (this.cat) {
        this.cat.updateCat();
    }
    
    // Process each obstacle:
    this.obstacles = this.obstacles.filter(obstacle => {
        
        // First, check for collision between the obstacle and the cat
        if (this.cat && obstacle.collide(this.cat)) {
            // If a collision occurs, check the type of obstacle
            if (obstacle.type === "fish") {
                // For a fish collision, increase score by 1 and update display
                this.score++;
                console.log("Score:" + this.score)
                this.displayPoints();
            } else if (obstacle.type === "bomb") {
                // For a bomb collision, trigger game over
                this.gameOver();
            }
            // Remove the obstacle (do not keep it in the array)
            return false;
        }
        // If no collision occurred, update the obstacle's fall() method.
        // If fall() returns false (obstacle off-screen), it will be filtered out.
        return obstacle.fall();
    });
    
    console.log("Update Running, score:", this.score);

        this.displayPoints();

        // Check win condition: 25 points means win (5 hearts * 5 points each)
        if (this.score >= 25) {
            this.gameWon();
        }

    }

    // catSelect(selection): Initializes the cat based on player's selection ("dia" or "nit")    
    catSelect(selection){
        if(selection === "dia"){
            this.cat = new Cat(this.gameScreen, "dia")

            // Set the initial cat image for Dia
            this.cat.element.src = "img/dia_default_left.svg";
        }
        else if(selection === "nit"){
            this.cat = new Cat(this.gameScreen, "nit");
            // Set the initial cat image for Nit
            this.cat.element.src = "img/nit_default_left.svg"; 
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

    // Method to display points and update hearts
    displayPoints() {
        // Select all heart images inside the hearts container
        const hearts = document.querySelectorAll("#hearts-score img");
        // Calculate how many hearts should be filled: one filled heart per 5 points
        const filledCount = Math.floor(this.score / 5);

        // Get the sound for the heart filled
        const heartFilledSound = document.getElementById("heart-filled");

        // Loop through each heart image
        hearts.forEach((heart, index) => {
            // If the heart's index is less than filledCount, fill it; otherwise, empty it.
            if (index < filledCount) {
                heart.src = "img/heart_filled.svg";  // Ensure this image exists
            } else {
                heart.src = "img/heart_empty.svg";   // Ensure this image exists
            }
        });

        // Check if a new heart has been filled
        if (filledCount > this.previousFilledCount) {
            heartFilledSound.play();
        }

        // Update the previous filled count
        this.previousFilledCount = filledCount;

        console.log("Score:", this.score, "Filled Hearts:", filledCount);
    }


    // gameOver(): Handles game over logic
    gameOver(){
        
        // Hide the game screen and display the game end screen
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";

        const gameOverSound = document.getElementById("game-over-sound");
        const purr = document.getElementById("purr");

        // Pause the Game song, play the game over sound and wait for it to finish, then play purr
        this.playGameSong.pause();
        gameOverSound.play();
        gameOverSound.volume = 1;
        
        setTimeout(() => {
            purr.play();
            purr.volume = 1;
        }, 300);

        console.log("Game Over");
    }

    // gameWon(): Handles game win logic
    gameWon(){
        const winnerCats = document.querySelector(".cats-container img");
        const headerGameEnd = document.querySelector("#game-end h1");

        // Hide the game screen and display the game end screen

        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
        
        // Change the content in the Game End screen
        headerGameEnd.innerText = "YOU WON!";
        winnerCats.src = "img/heart_filled.svg";
        console.log("Winner!");
    }

    pauseGame() {
        // Toggle the pause state
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            console.log("Game Paused");

            // Stop the game loop and obstacle spawning
            clearInterval(this.gameIntervalId);
            clearInterval(this.obstacleSpawnInterval);

            // Pause the background music
            this.playGameSong.pause();
        } else {
            console.log("Game Resumed");

            // Restart the game loop
            this.gameIntervalId = setInterval(() => {
                this.gameLoop();
            }, this.gameLoopFrequency);

            // Restart spawning obstacles
            this.obstacleSpawnInterval = setInterval(() => {
                this.spawnObstacle();
            }, this.spawnRate);

            // Resume the background music
            this.playGameSong.play();
        }
    }


    }
