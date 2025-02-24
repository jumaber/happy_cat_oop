class Cat {
    constructor(gameScreen, left, width, height){
        // gameScreen div reference
        this.gameScreen = gameScreen;

        //Cat position control
        this.left = left;
        this.width = width;
        this.height = height;

        //Cat movement control
        this.directionX = 0;
    }
    
    renderCat(){
        console.log("Cat Rendered");
    }
    
    move(){
        console.log("Cat Moving");
    }

    collect(){
        console.log("Collected Points");
    }

    reset(){
        console.log("Cat Reseted");
    }

      updateCat(){
        console.log("Cat's boundaries and dynamic properties have been updated");
    }

}



// REQUIREMENTS FOR THE CAT //
/*
- The cat image must be selected in the starting screen
    - Post MVP: each cat has different properties
- The cat must appear in the game screen - renderCat(){}
- The cat must be able to move left and right - move(){}
    - The cat's image must change when moving to the correspondent side
    - The cat's image must make a sound when moving 
    - The cat's image must remain within the limit of the screen
    - Post MVP: Jump
- The cat must be able to collect fish and add to the counter - collect(){}
- The position of the cat must be reset when there is a new game session - reset(){}
- The cat's state must be updated in each game loop iteration - update()
*/