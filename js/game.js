class Game {
    constructor(){
    // Screen Controls
    this.gameIntroScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
        
    this.cat = null;
    this.obstacles = [];
    
    // game screen width and height
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    // game score control
    this.score = 0;
    this.scoreHTML = document.getElementById("hearts-score");
    
    // game control settinfs
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = 1000/60; 

}

    start(){
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;

        this.gameIntroScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        this.gameIntervalId = setInterval(() => {
        this.gameLoop(); // it will run 60/second the game
        }, this.gameLoopFrequency);
        console.log("Game Started")
    }

    gameLoop(){
        this.update();

        if(this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
        console.log("Game Looped")
    }

    update(){
        if(this.cat){
            this.cat.updateCat();
        }
        console.log("Update Running");
    }

    catSelect(selection){
        if(selection === "dia"){
            this.cat = new Cat(this.gameScreen, "dia");
            this.cat.element.src = "img/dia_happy_left.svg";
        }
        else if(selection === "nit"){
            this.cat = new Cat(this.gameScreen, "nit");
            this.cat.element.src = "img/nit_happy_left.svg"; 
        }

        this.gameScreen.appendChild(this.cat.element);
        
        console.log("Cat Selected:" + selection);
    }
    
    collectPoints(){
        console.log("Points Collected");
    }

    displayPoints(){
        console.log("Points Displayed");
    }

    gameOver(){
        console.log("Game Over");
    }

    gameWon(){
        console.log("Winner!");
    }
}


// REQUIREMENTS FOR THE GAME //
/* 
- The Game needs to start and set up a loop - gameLoop{}
- The game needs to be updated - update(){}
- The players need to choose a cat to play with - catSelect(){}
- The points need to be collected - collectPoints(){}
- The points need to be displayed in shape of heart. Every 5 points, 1 heart is filled. - displayPoints(){}
- The user needs to know when the game is over - gameOver(){}
- The user needs to know when the game is won - gameWon(){}
    - Post-MVP: Confetti
*/