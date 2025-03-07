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
    this.gameIntervalId = null;         // Will store the game loop interval
    this.obstacleSpawnInterval = null;  // Will store obstacle spawning interval
    this.gameLoopFrequency = 1000 / 60; // ~60 frames per second (16.67ms per frame)
    this.spawnRate = 1000;

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
      this.playGameSong.volume = 0.1;
    }, 300);

    // Set initial level or at least set this.speed, spawnRate, etc.
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
    this.cat; // (Appears to do nothing, leaving as-is)

    // Update obstacles and check for collisions
    this.obstacles = this.obstacles.filter((obstacle) => {
      if (this.cat && obstacle.collide(this.cat)) {
        if (obstacle.type === "fish") {
          this.score++;
          this.updateLevel(); // Check if we need to update the cat speed
        } else if (obstacle.type === "bomb") {
          this.gameOver();
        }
        return false; // Remove the obstacle after collision
      }
      return obstacle.fall(); // Remove obstacle if off-screen
    });

    console.log("Update Running, score:", this.score);

    // Check for win condition
    if (this.score >= 50) {
      this.gameWon();
    }
  }

  // 🐱 Select a cat ("dia" or "nit")
  catSelect(selection) {
    this.cat = new Cat(this.gameScreen, selection);
    this.cat.element.src =
      selection === "dia" ? "img/dia_default_left.svg" : "img/nit_default_left.svg";
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
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
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
    const activeSong = [introSong, playGameSong, this.purr].find(
      (song) => !song.paused
    );

    // Toggle music on/off
    if (activeSong) {
      activeSong.pause();
      soundToggleText.innerText = "Music Off";
      if (screen === "end") {
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
      if (screen === "end") {
        soundToggleText.innerText = "Purr On";
      }
      soundToggleImage.src = "audio/sound_is_on.svg";
    }
  }

  // ❤️ Handles the speed
  updateLevel() {
    const heartFilledSound = document.getElementById("heart-filled");
    const level = document.querySelector(".level");
    const levelHearts = [
      document.getElementById("heart1"),
      document.getElementById("heart2"),
      document.getElementById("heart3"),
      document.getElementById("heart4"),
      document.getElementById("heart5"),
    ];

    const filledCount = Math.floor(this.score / 10);

    if (filledCount > this.previousFilledCount) {
      heartFilledSound.play(); // Play sound ONLY when a new heart gets filled
      this.previousFilledCount = filledCount; // Update the previous count
    }

    // Update heart images based on the filledCount
    levelHearts.forEach((heart, index) => {
      if (index < filledCount) {
        heart.src = "img/heart_filled.svg";
      } else {
        heart.src = "img/heart_empty.svg";
      }
    });

    // Adjust game settings based on level
    if (this.score < 10) {
      this.cat.steps = 1;
      this.bombChance = 0.2;
      this.speed = Math.random() * 1 + 1;
      level.innerText = "Level 0";
    } else if (this.score < 20) {
      this.cat.steps = 1.5;
      this.speed = Math.random() * 1 + 2;
      this.bombChance = 0.3;
      level.innerText = "Level 1";
    } else if (this.score < 30) {
      this.cat.steps = 2.5;
      this.speed = Math.random() * 1 + 3;
      this.bombChance = 0.4;
      level.innerText = "Level 2";
    } else if (this.score < 40) {
      this.cat.steps = 3.5;
      this.speed = Math.random() * 1 + 4;
      this.bombChance = 0.5;
      level.innerText = "Level 3";
    } else if (this.score < 50) {
      this.cat.steps = 5;
      this.speed = Math.random() * 1 + 5;
      this.bombChance = 0.6;
      level.innerText = "Level 4";
    }
  }
}
