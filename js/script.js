window.onload = function () {
  // Get references to DOM elements
  const nitCat = document.getElementById("nit-cat");
  const diaCat = document.getElementById("dia-cat");
  const gameIntroScreen = document.getElementById("game-intro");
  const gameScreen = document.getElementById("game-screen");
  const startButton = document.getElementById('play-button');
  const restartButton = document.getElementById('restart-button');

  // Create a new Game instance
  const game = new Game();

  // **** SELECT THE CAT *** //

  // Update the start button text when a cat is clicked
  nitCat.addEventListener("click", () => {
    startButton.innerText = "Play with Nit";
  });

  diaCat.addEventListener("click", () => {
    startButton.innerText = "Play with Dia";
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
    location.reload();
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
