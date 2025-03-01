class Game {
    constructor() {
        // Get references to game screens
        this.gameIntroScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");

        // Audio elements used in multiple methods
        this.playGameSong = document.getElementById("play-game-song");
        this.purr = document.getElementById("purr");
        this.winnerSound = document.getElementById("winner");



        // Game state variables
        this.cat = null;
        this.obstacles = [];
        this.gameIsOver = false;
        this.isPaused = false;
        this.score = 0;
        this.previousFilledCount = 0;

        // Game loop and obstacle settings
        this.gameIntervalId = null; // Will store the game loop interval
        this.obstacleSpawnInterval = null; // Will store obstacle spawning interval
        this.gameLoopFrequency = 1000 / 60; // ~60 frames per second (16.67ms per frame)
        this.spawnRate = this.spawnRate; 

        // Get score display element
        this.scoreHTML = document.getElementById("hearts-score");
    }

    // 🎮 Start the game
    start() {
        // Set game screen dimensions
        this.gameScreen.style.width = `${window.innerWidth}px`;
        this.gameScreen.style.height = `${window.innerHeight}px`;

        // Hide intro screen and show game screen
        this.gameIntroScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        // Play game start sound and background music
        const gameStartSound = document.getElementById("game-start-sound");
        const introSong = document.getElementById("intro-song");

        introSong.pause();
        gameStartSound.play();

        setTimeout(() => {
            this.playGameSong.play();
            this.playGameSong.loop = true;
            this.playGameSong.volume = 0.3;
        }, 300);

        // Set your initial level or at least set this.speed, spawnRate, etc.
        this.updateLevel();
        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency);
        this.obstacleSpawnInterval = setInterval(() => this.spawnObstacle(), this.spawnRate);


        console.log("Game Started");
    }

    // 🔄 Main game loop (runs every frame)
    gameLoop() {
        this.update();

        // Stop game loop if game is over
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
            clearInterval(this.obstacleSpawnInterval);
        }
    }

    // 🔄 Update game objects
    update() {
        if (this.cat) {
            this.cat.updateCat();
        }

        // Update obstacles and check for collisions
        this.obstacles = this.obstacles.filter(obstacle => {
            if (this.cat && obstacle.collide(this.cat)) {
                if (obstacle.type === "fish") {
                    this.score++;
                    // this.displayPoints();
                    this.updateLevel() // Check if we need to update the cat speed
                } else if (obstacle.type === "bomb") {
                    this.gameOver();
                }
                return false; // Remove the obstacle after collision
            }
            return obstacle.fall(); // Remove obstacle if off-screen
        });

        console.log("Update Running, score:", this.score);

        // Check for win condition
        if (this.score >= 25) {
            this.gameWon();
        }
        
        
    }

    // 🐱 Select a cat ("dia" or "nit")
    catSelect(selection) {
        this.cat = new Cat(this.gameScreen, selection);
        this.cat.element.src = selection === "dia" ? "img/dia_default_left.svg" : "img/nit_default_left.svg";
        this.gameScreen.appendChild(this.cat.element);

        console.log("Cat Selected:", selection);
    }

    // 🐟 Spawn a new obstacle (fish or bomb)
        spawnObstacle() {
    const randomType = Math.random() < this.bombChance ? "bomb" : "fish";
    const speed = this.speed;
    const obstacle = new Obstacles(this.gameScreen, randomType, speed);
    obstacle.spawn();
    this.obstacles.push(obstacle);
    console.log("spawnObstacle called - randomType:", randomType, "speed:", speed);
}



    // ☠️ Handle game over state
    gameOver() {
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";

        // Play game over sound
        const gameOverSound = document.getElementById("game-over-sound");

        this.playGameSong.pause();
        gameOverSound.play();

        setTimeout(() => {
            this.purr.play();
        }, 300);

        console.log("Game Over");
    }

    // 🎉 Handle game won state
    gameWon() {
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";

        const headerGameEnd = document.querySelector("#game-end h1");
        const winnerCats = document.querySelector(".cats-container img");

        headerGameEnd.innerText = "YOU WON!";
        winnerCats.src = "img/winner.svg";

        this.playGameSong.pause();

        setTimeout(() => {
            this.purr.play();
        }, 300);


        console.log("Winner!");
    }

    // ⏸ Toggle pause state
    pauseGame() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            console.log("Game Paused");
            clearInterval(this.gameIntervalId);
            clearInterval(this.obstacleSpawnInterval);
            this.playGameSong.pause();
        } else {
            console.log("Game Resumed");
            this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency);
            this.obstacleSpawnInterval = setInterval(() => this.spawnObstacle(), this.spawnRate);
            this.playGameSong.play();
        }
    }

    // 🔄 Restart the game (reset to intro screen)
    restart() {
        // Clear game intervals
        clearInterval(this.gameIntervalId);
        clearInterval(this.obstacleSpawnInterval);

        // Hide game and end screens, show intro screen
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "none";
        this.gameIntroScreen.style.display = "block";

        // Reset game state
        this.isPaused = false;
        this.gameIsOver = false;
        this.score = 0;
        this.previousFilledCount = 0;

        // Remove all obstacles
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.obstacles = [];

        // Remove the cat (force re-selection)
        if (this.cat) {
            this.cat.element.remove();
            this.cat = null;
        }

        // Remove selection stroke from intro screen cats
        document.getElementById("Union_Nit").style.stroke = "none";
        document.getElementById("Union_Dia").style.stroke = "none";

        // Stop all game sounds and reset background music
        this.playGameSong.pause();

        console.log("Game Restarted - Fresh Start");
    }

    toggleMusic(screen) {
        // Define the audio elements
        const introSong = document.getElementById("intro-song");
        const playGameSong = document.getElementById("play-game-song");

        // Select the correct toggle button and text based on the screen
        let soundToggle, soundToggleText, soundToggleImage;
        if (screen === "intro") {
            soundToggle = document.getElementById("sound-toggle-intro");
            soundToggleText = document.querySelector("#sound-toggle-intro h3");
            soundToggleImage = document.querySelector("#sound-toggle-intro img");
        } else if (screen === "play") {
            soundToggle = document.getElementById("sound-toggle-play");
            soundToggleText = document.querySelector("#sound-toggle-play h3");
            soundToggleImage = document.querySelector("#sound-toggle-play img");
        } else if (screen === "end") {
            soundToggle = document.getElementById("sound-toggle-end");
            soundToggleText = document.querySelector("#sound-toggle-end h3");
            soundToggleImage = document.querySelector("#sound-toggle-end img");
        }

        // Determine which song is currently playing
        const activeSong = [introSong, playGameSong, this.purr].find(song => !song.paused);

        // Toggle music on/off
        if (activeSong) {
            activeSong.pause();
            soundToggleText.innerText = "Music Off";
                if (screen === "end"){
                    soundToggleText.innerText = "Purr Off";
                }
            soundToggleImage.src = "audio/sound_is_off.svg";
        } else {
            // Resume the correct music based on the screen
            if (screen === "intro") {
                introSong.play();
            } else if (screen === "play") {
                playGameSong.play();
            } else if (screen === "end") {
                this.purr.play();
            }
            soundToggleText.innerText = "Music On";
                if (screen === "end"){
                    soundToggleText.innerText = "Purr On";
                }
            soundToggleImage.src = "audio/sound_is_on.svg";
        }
    }

    // ❤️ Handles 
     updateLevel(){

        const heartFilledSound = document.getElementById("heart-filled");
        const level1Heart = document.getElementById("heart1");
        const level2Heart = document.getElementById("heart2");
        const level3Heart = document.getElementById("heart3");
        const level4Heart = document.getElementById("heart4");
        const level5Heart = document.getElementById("heart5");
        

        if (this.score >= 0 && this.score < 5){ // Level 0
            this.cat.steps = 1; 
            this.bombChance = 0.20;
            this.speed = Math.random() * 1 + 1;  // e.g., a speed between 1 and 2 px per frame
            this.spawnRate = 1500;
            console.log("Steps: 1%, Level: 1")

        }
            else if(this.score >= 5 && this.score < 10){ // Level 1
                this.cat.steps = 1.5; 
                this.speed = Math.random() * 1 + 2;
                this.bombChance = 0.30;
                this.spawnRate = 1000;
                level1Heart.src = "img/heart_filled.svg";
                heartFilledSound.play();
                console.log("Steps:" + this.cat.steps + "%, Level:2")
            }
            else if(this.score >= 10 && this.score < 15){ // Level 2
                this.cat.steps = 2.5;
                this.speed = Math.random() * 1 + 3;
                this.bombChance = 0.40;
                this.spawnRate = 500;
                level2Heart.src = "img/heart_filled.svg";
                heartFilledSound.play();
                console.log("Steps:" + this.cat.steps + "%, Level:3")

            }
            else if(this.score >= 15 && this.score < 20){ // Level 3
                this.cat.steps = 3.5;
                this.speed = Math.random() * 1 + 4;
                this.bombChance = 0.5;
                this.spawnRate = 200;
                level3Heart.src = "img/heart_filled.svg";
                heartFilledSound.play();
                console.log("Steps:" + this.cat.steps + "%, Level: 4")
            }
            else if(this.score >= 20 && this.score < 24){ // Level 4
                this.cat.steps = 5;
                this.speed = Math.random() * 1 + 4;
                this.bombChance = 0.6;
                this.spawnRate = 50;
                level4Heart.src = "img/heart_filled.svg";
                heartFilledSound.play();
                console.log("Steps:" + this.cat.steps + "%, Level: 4")
            }
            else if(this.score === 25){ // Level 5 = Won!
                level5Heart.src = "img/heart_filled.svg";
                heartFilledSound.play();
            }
        }
    }