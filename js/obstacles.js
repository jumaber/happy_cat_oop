class Obstacles {
    constructor(){}

    spawn(){
        console.log("Obstacles have been spawned");
    }
    fall(){
        console.log("Obstacles are falling down");
    }
    
    collide(){
        console.log("Obstacles have collided with the cat");
    }
}  
  


// REQUIREMENTS FOR THE OBJECTS //
/*
- The two types of obstacles must be spawned (created) each of them a random amount and time speed - spawn(){}
    - The fish: collect points
    - The bombs: game over
- The obstacles must fall from the top to the bottom - fall(){} 
    - The obstacles must be removed when they reach the bottom of the screen 
- The obstacles must collide with the cat - collide(){}
*/