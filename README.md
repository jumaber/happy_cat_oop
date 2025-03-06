# HAPPY CAT

![Game logo](./img/heart_filled.svg)

## Introduction
Welcome to **Happy Cat**, a fun-filled, feline adventure! Choose your favorite cat—Dia or Nit—and embark on a delightful quest to catch as many fish as possible while carefully dodging bombs. Can your cat become the happiest cat by filling all 5 hearts?

## MVP
### Themes
- **Character**: Choose your cat—adorable **Dia** or playful **Nit**
- **UI**: Playful, colorful pixel-art inspired design, cozy and minimalistic

### Win/Lose Logic
- **Goal**: Catch **50 fish** to fill all **5 hearts**
- **Win**: Successfully collect **50 fish** without hitting bombs
- **Lose**: Hit a bomb, and it's game over!

### Basic Functionalities
- **Cat moves**: Move left and right using arrow keys, jump with the up arrow.
- **Game Objects**: Fish and bombs fall randomly
  - Objects do not overlap with the cat's starting position
  - Items fall vertically and increase speed as you progress through levels
  - Objects disappear upon collision with the cat
- **Hearts and Score**: Each heart is filled by catching 5 fish (10 fish = 1 heart filled)
- **Game End**: Instantly ends if a bomb is caught
- **Screen size**: Designed for desktop, not suitable for mobile devices

## Iterations
### Second Iteration
- [ ] Add background music and engaging sound effects
- [ ] Add Music Pause, Game Pause and Restart function
- [ ] Enhance bomb behavior for added challenge

### Third iteration
- [ ] Add jump function to catch fish faster
- [ ] Add 4 more levels with increasing cat speed, falling items and higher percentage of falling bombs
- [ ] Improve responsive design to avoid screen overflow issues


## Backlog
- [ ] Add new obstacles or bonuses with unique interactions *#designheavy*
- [ ] Add qualities for each cat
- [ ] Improve Pause function

## Useful Functions
<details>
<summary>Create a function to switch between screens</summary>

```javascript
function switchScreen(fromScreen, toScreen, displayType){
    fromScreen.style.display = "none";
    toScreen.style.display = displayType; 
}

</details> 
<details> 
<summary>Event listener to switch screen on button click</summary>

document.getElementById("play-button").addEventListener("click", () => {
    switchScreen(gameIntroScreen, gameScreen, "block");
});
</details> 

<details> 
<summary>Positioning your Cat dynamically</summary>

// Dynamically positions the cat based on screen width percentage
cat.element.style.left = cat.positionXPercent + "%";
</details> 

<details> 
<summary>Creating and spawning obstacles (fish and bombs)</summary>
const obstacle = new Obstacles(gameScreen, "fish", obstacleSpeed);
obstacle.spawn();
</details> 

<details> 
<summary>Collision detection logic</summary>
if(obstacle.collide(cat)) {
    if(obstacle.type === "bomb") {
        game.gameOver();
    } else {
        game.score++;
    }
}
</details> 

## States and Screen Transitions
- **Start Screen**: Game title, cat selection, and Play button
- **Instruction Screen**: Explains cat controls (arrow keys for left/right, spacebar for jumping), objectives (catch fish, avoid bombs)
- **Game Screen**: Main gameplay area with falling items
- **Game End Screen**: Displays final score and game outcome (win or lose)

## Tasks
- [x] **Step 1**: Core game logic; basic HTML & CSS structure
- [x] **Step 2**: Implement CSS & HTML layouts for screens; enable screen transitions
- [x] **Step 3**: Generate UI assets and iterate CSS styling
- [x] **Step 4**: Cat class & movement logic
- [x] **Step 5**: Cat movement, obstacles creation, and collision detection
- [x] **Step 5**: Implement scoring logic and game-object interactions
- [ ] **Step 6**: Initial documentation draft
- [ ] **Step 7**: Prepare presentation structure and slides
- [ ] **Step 8**: Refactor codebase for better scalability
- [ ] **Step 9**: Add background music and sound effects
- [ ] **Step 10**: Finalize data structure documentation
- [ ] **Step 11**: Review final documentation and prepare presentation slides
