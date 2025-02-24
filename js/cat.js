
class Cat {
    constructor(gameScreen, type, left = 650, width = 160, height = 160, top = 400) {
        this.gameScreen = gameScreen;
        this.type = type; // "dia" or "nit"
        this.positionX = left;  // use positionX for clarity
        this.width = width;
        this.height = height;
        this.top = top;
        this.directionX = 0;

        this.element = document.createElement("img");
        this.element.style.position = "absolute";
        this.element.style.left = this.positionX + "px";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.top = this.top + "px";

    }
  
    move(pixels){
        this.positionX += pixels;

        // Setting the maximum movement range of the cat, which is the screen size
        const maxPosition = this.gameScreen.offsetWidth - this.width; //size of the screen minus the size of the cat
        if (this.positionX < 0) { // handle the left side (where it starts at 0)
            this.positionX = 0;
        }
        else if (this.positionX > maxPosition) { // handle the right side (where the screen finishes)
            this.positionX = maxPosition;
        }
        this.renderCat();
        }
       

    renderCat() {
    // Update DOM based on positionX
    this.element.style.left = this.positionX + "px";

    console.log("Cat Rendered");
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