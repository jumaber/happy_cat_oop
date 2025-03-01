window.onload = function () {
  // Get references to DOM elements
  const nitCat = document.getElementById("nit-cat");
  const diaCat = document.getElementById("dia-cat");
  const gameIntroScreen = document.getElementById("game-intro");
  const gameScreen = document.getElementById("game-screen");
  const startButton = document.getElementById("play-button");
  const restartButton = document.getElementById("restart-button");

  const nitStroke = document.getElementById("Union_Nit");
  const diaStroke = document.getElementById("Union_Dia");

  
  // **** AUDIO **** //
  const miaow = document.getElementById("miaow");
  const introSong = document.getElementById("intro-song");
  const clickSound = document.getElementById("click-sound");
  const clickToggle = document.getElementById("click-toggle")


  // Create a new Game instance
  const game = new Game();


  // **** MUSIC GAME INTRO SCREEN ****
  document.addEventListener("mouseover", () => {
    introSong.play().catch(error => console.log("Autoplay blocked:", error));
    introSong.volume = 0.1;
}, { once: true }); // This will play the sound only once


  // **** TOGGLE MUSIC IN ALL SCREENS ****
 document.getElementById("sound-toggle-intro").addEventListener("click", () => {
    game.toggleMusic("intro");
});

document.getElementById("sound-toggle-play").addEventListener("click", () => {
    game.toggleMusic("play");
});

document.getElementById("sound-toggle-end").addEventListener("click", () => {
    game.toggleMusic("end");
});
   

  // **** PAUSE THE GAME **** 
  const pauseGame = document.getElementById("pause-game");
  const pauseGameImg = document.querySelector("#pause-game img");
  const pauseGameText = document.querySelector("#pause-game span"); // Target only text

  pauseGame.addEventListener("click", () => {
      if (pauseGameText.innerText === "Pause Game") {
          pauseGameText.innerText = "Resume Game";
          pauseGameImg.src = "img/resume.svg";
          game.pauseGame();
      } else {
          pauseGameText.innerText = "Pause Game";
          pauseGameImg.src = "img/pause.svg";
          game.pauseGame();
      }
  });

// **** RESTART THE GAME **** 
const restart = document.getElementById("restart-game");

restart.addEventListener("click", () => {
  game.restart();
});

     

  // **** SELECT THE CAT **** 

  // Update the start button text when a cat is clicked
  nitCat.addEventListener("click", () => {
    miaow.play();
    miaow.volume = 0.3;
    startButton.innerText = "Play with Nit";
    diaStroke.style.stroke = "none";
    diaStroke.style["stroke-width"] = "0px";
    nitStroke.style.stroke = "#FED23E";
    nitStroke.style["stroke-width"] = "3px";
   
  });

  diaCat.addEventListener("click", () => {
    miaow.play();
    miaow.volume = 0.3;
    startButton.innerText = "Play with Dia";
    nitStroke.style.stroke = "none";
    nitStroke.style["stroke-width"] = "0px";
    diaStroke.style.stroke = "#FED23E";
    diaStroke.style["stroke-width"] = "3px";
    
  });

  startButton.addEventListener("click", () =>{
    clickSound.play();
  });
  


  // When the start button is clicked, create the selected cat and start the game
  startButton.addEventListener('click', () => {
    if (startButton.innerText === "Play") {
      startButton.innerText = "Pick a Cat"; 
    }
    else if (startButton.innerText === "Play with Dia") {
      game.catSelect("dia");
      gameIntroScreen.style.display = "none";
      gameScreen.style.display = "block";
      game.start();
    }
    else if (startButton.innerText === "Play with Nit") {
      game.catSelect("nit");
      gameIntroScreen.style.display = "none";
      gameScreen.style.display = "block";
      game.start();
    }
  });


  // Restart the game
  restartButton.addEventListener("click", () => {
    clickSound.play();

    setTimeout(() => {
       location.reload(); // Reload after a short delay of 0,2 seconds
    }, 200);
  });

  // Movement: Listen for arrow key presses and call the move() method on the selected cat
  document.addEventListener("keydown", (event) => {
    if (!game.cat) return; // ensure a cat has been selected
    if (event.key === "ArrowLeft") {
      game.cat.move(-20);
      moveCatSound.play();
      // Optionally, update the image or play sound inside move() or here
    } else if (event.key === "ArrowRight") {
      game.cat.move(20);
      // Optionally, update the image or play sound inside move() or here
    }
  });

  document.addEventListener("keyup", (event) => {
    if (!game.cat) return;
    if (event.key === "ArrowLeft") {
      if(game.cat.type === "dia"){
      game.cat.element.src = "img/dia_default_left.svg"
      }
      if(game.cat.type === "nit"){
      game.cat.element.src = "img/nit_default_left.svg"
      }

    } else if (event.key === "ArrowRight") {
 if(game.cat.type === "dia"){
      game.cat.element.src = "img/dia_default_right.svg"
      }
      if(game.cat.type === "nit"){
      game.cat.element.src = "img/nit_default_right.svg"
      }
    }
  });
};
