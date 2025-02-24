window.onload = function () {
  const startButton = document.getElementById('play-button');
  const restartButton = document.getElementById('restart-button');
  let game;


  restartButton.addEventListener("click", () => {
    location.reload()
  });
  
  startButton.addEventListener('click', () => {
        startGame();
     });

    function startGame() {
        console.log('Game Started');
        game = new Game();
        game.start();
  }

  // Placing the cat on the game screen 
  let cat = new Cat();
  console.log(cat);

  cat.renderCat();
  cat.updateCat();
}
