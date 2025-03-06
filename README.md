# NIFFLER'S LOOT


![Game logo](/Images2/Niffler_readme.gif)

## Introduction
You've got a Niffler - a furry little loot goblin with a nose for treasure and zero self-control. But in a world of gold and glitter, not everything is worth grabbing. Do you know how to loot wisely? Try out this game to see if you can hoard as much money within a certain time limit.

## MVP
### Themes
- **Character**: Niffler, inspired by the movie **Fantastic beasts and where to find them**
- **UI**: dreamy and minimalistic, inspired by **Monument Valley**
### Win lose logic
- **Goal**: Loot enough money within a certain time limit 
- **Win**: Your Niffler can go to the next round
- **Lose**: You can play again
### Basic functionalities
- **Niffler's moves**: The player uses arrows to move their Niffler
- **Game objects**: coins, stones, red pockets and cursed coins are generated at random
    - The generated game objects must not overlap with the current position of the Niffler
    - The game objects and the Niffler's location are strictly positioned within a grid cell
    - The game object disappear shortly after the Niffler moves into the object's position
- **Loot balance**: The loot balance gets updated after each collision, and is restarted before each round begins
- **Time**: The game is over after the time runs out; the game is won as soon as the target is met
- **Screen size**: The game is not suitable for small touch screens (ipad, mobile)

## Iterations
### Second iteration
- [x] Add 2 more levels with different settings
- [x] Upgrade the cursed coin function for the next level
- [x] Refactor code to make it easier to add levels

### Third iteration
- [x] Add music
- [x] Fix screen size to avoid scrolling & make sure components don't overflow
- [x] Generate different random ending messages for both levels

## Backlog
- [ ] Next level: A new game object - banana, which will make your Niffler slide *#designheavy*
- [ ] Next level: If the Niffler gets stuck in any cursed coin 5 times, the game is over
- [ ] Next level: Cursed coin means random telepot 
- [ ] Betting function for points multiplier *#designheavy*
- [ ] Saving the fastest loot during each round *#designheavy*
- [ ] Modify the Challenge screen so you can click on a map to go back a level *#designheavy*
- [ ] Fix bugs: Sometimes points don't add because the Niffler moves at the same time as the object being generated
- [ ] Add shortcuts to stop the music + instruction when hovering your mouse on the music icon

## Useful functions
<details>
    <summary>Create a change screen function </summary>
```javascript 
function switchScreen(fromScreen, toScreen, displayType){
    fromScreen.style.display = "none";
    toScreen.style.display = displayType; 
}
</details>```

###Create an event listener to switch screen
```javascript
buttons.nextLevel.addEventListener("click", () =>{
    // console.log("next level button clicked");
    switchScreen(screens.gameEnd, screens.gameChallenge, "flex");
    currentLevel++;
    loadLevel(currentLevel);
})


<details>
    <summary> Positioning the Niffler</summary>

**Objective 1:**
``` Test code ```
**Objective 2:**
``` Test code ```

</details>
<details>
    <summary> Generating game objects</summary>

**Objective 1:**
``` Test code ```
**Objective 2:**
``` Test code ```

</details>
<details>
    <summary> Adding different levels</summary>

**Objective 1:**
``` Test code ```
**Objective 2:**
``` Test code ```

</details>

## States y States Transitions
- **Start Screen**: contains the game's name, the main logo, and the next button
- **Instruction Screen**: contains instructions on how to move the Niffler, and what objects to loot and to avoid
- **Game Screen**: where the games take place
- **Game End Screen**: contains the final score and the final status (win or lose)

## Task
- [x] **Step 1**: Game logic; HTML basic structure; CSS basic structure
- [x] **Step 2**: CSS & HTML iteration for each screen (first 4 screens of Level 1); screen switch functions;
- [x] **Step 3**: Generate all UI components with ChatGPT, DALL-E and Adobe Express; CSS iteration
- [x] **Step 4**: Game screen; Player's classes & methods
- [x] **Step 5**: Game object classes & methods; Collision without points; Countdown functions; Loot balance functions; collision with points
- [x] **Step 6**: Drafted documentation excluding data structure
- [x] **Step 7**: Drafted presentation; Game logic, HTML basic structure, CSS basic structure of Level 2
- [x] **Step 8**: Second iteration of the game screen; Code refactor
- [x] **Step 9**: Third iteration; add music 
- [ ] **Step 10**: Data structure documentation; 
- [ ] **Step 11**: review documentation & create the presentation slide

## Links
- [Slides Link](https://docs.google.com/presentation/d/1KTISjNAhMh3GGtTzAaSYKxxfw5YfKdt1qn2AL2ZiFlQ/edit?usp=sharing)
- [Github repository Link](https://github.com/znguye/NifflerLoot)
- [Deployment Link](znguye.github.io/NifflerLoot/)