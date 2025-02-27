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

  const soundToggleIntro = document.getElementById("sound-toggle-intro");
  const soundToggleTextIntro = document.querySelector("#sound-toggle-intro h3");
  const soundToggleImageIntro = document.querySelector("#sound-toggle-intro img");

  const soundTogglePlay = document.getElementById("sound-toggle-play");
  const soundToggleTextPlay = document.querySelector("#sound-toggle-play h3");
  const soundToggleImagePlay = document.querySelector("#sound-toggle-play img");

  const soundToggleEnd = document.getElementById("sound-toggle-end");
  const soundToggleTextEnd = document.querySelector("#sound-toggle-end h3");
  const soundToggleImageEnd = document.querySelector("#sound-toggle-end img");

  
  // **** AUDIO **** //
  const miaow = document.getElementById("miaow");
  const introSong = document.getElementById("intro-song");
  const clickSound = document.getElementById("click-sound");
  const clickToggle = document.getElementById("click-toggle")


  // Create a new Game instance
  const game = new Game();


  // **** MUSIC GAME INTRO SCREEN ****
  document.addEventListener("mouseover", () => {
    const introSong = document.getElementById("intro-song");
    introSong.play().catch(error => console.log("Autoplay blocked:", error));
    introSong.volume = 0.1;
}, { once: true }); // This will play the sound only once


    // Toggle for the Game Intro Screen
  soundToggleIntro.addEventListener("click", () => {
    if (soundToggleTextIntro.innerText === "Music On") {
        introSong.pause();  // Change this from playGameSong to introSong
        clickToggle.play();
        soundToggleTextIntro.innerText = "Music Off";
        soundToggleImageIntro.src = "audio/sound_is_off.svg";  // Corrected path
    } else if (soundToggleTextIntro.innerText === "Music Off") {
        introSong.play(); // Change this from playGameSong to introSong
        clickToggle.play();
        soundToggleTextIntro.innerText = "Music On";
        soundToggleImageIntro.src = "audio/sound_is_on.svg";  // Corrected path
    }
  });



    // // Toggle for the Game Screen
    // soundTogglePlay.addEventListener("click", () => {
    //   if (soundToggleTextPlay.innerText === "Music On") {
    //       playGameSong.pause();
    //       clickToggle.play();
    //       soundToggleTextPlay.innerText = "Music Off";
    //       soundToggleImagePlay.src = "sounds/sound_is_off.svg";
    //     } else if (soundToggleTextPlay.innerText === "Music Off") {
    //         playGameSong.play();
    //         clickToggle.play();
    //         soundToggleTextPlay.innerText = "Music On";
    //         soundToggleImagePlay.src = "sounds/sound_is_on.svg";
    //     }
    //   });


    // // Toggle for the Game End Screen
    // soundToggleEnd.addEventListener("click", () => {
    //   if (soundToggleTextEnd.innerText === "Music On") {
    //       playGameSong.pause();
    //       clickToggle.play();
    //       soundToggleTextEnd.innerText = "Music Off";
    //       soundToggleImageEnd.src = "sounds/sound_is_off.svg";
    //     } else if (soundToggleTextEnd.innerText === "Music Off") {
    //         playGameSong.play();
    //         clickToggle.play();
    //         soundToggleTextEnd.innerText = "Music On";
    //         soundToggleImageEnd.src = "sounds/sound_is_on.svg";
    //     }
    //   });

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


     

  // **** SELECT THE CAT **** 

  // Update the start button text when a cat is clicked
  nitCat.addEventListener("click", () => {
    miaow.play();
    startButton.innerText = "Play with Nit";
    diaStroke.style.stroke = "none";
    diaStroke.style["stroke-width"] = "0px";
    nitStroke.style.stroke = "#FED23E";
    nitStroke.style["stroke-width"] = "3px";
   
  });

  diaCat.addEventListener("click", () => {
    miaow.play();
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
