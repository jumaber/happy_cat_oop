window.onload = function () {
  // Get references to DOM elements
  const nitCat = document.getElementById("nit-cat");
  const diaCat = document.getElementById("dia-cat");
  const gameIntroScreen = document.getElementById("game-intro");
  const gameScreen = document.getElementById("game-screen");
  const startButton = document.getElementById("play-button");
  const restartButton = document.getElementById("restart-button");
  const soundToggle = document.querySelectorAll(".sound-toggle")
  const soundToggleImage = document.querySelectorAll(".sound-toggle img");
  const soundToggleText = document.querySelectorAll(".sound-toggle h3");
  
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
    introSong.volume = 0.5;
    introSong.loop = true;
    });

    soundToggle.forEach((toggle, index) => {
    toggle.addEventListener("click", () => {
        if (soundToggleText[index].innerText === "Music On") {
            introSong.pause();
            clickToggle.play();
            soundToggleText[index].innerText = "Music Off";
            soundToggleImage[index].src = "audio/sound_is_off.svg";
        } else {
            introSong.play();
            clickToggle.play();
            soundToggleText[index].innerText = "Music On";
            soundToggleImage[index].src = "audio/sound_is_on.svg";
        }
    });
});



  // **** SELECT THE CAT **** 

  // Update the start button text when a cat is clicked
  nitCat.addEventListener("click", () => {
    startButton.innerText = "Play with Nit";
    miaow.play();
  });

  diaCat.addEventListener("click", () => {
    startButton.innerText = "Play with Dia";
    miaow.play();
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
