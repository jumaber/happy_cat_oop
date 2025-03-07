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
- [ ] Add 4 more levels with increasing cat speed, falling items, and a higher percentage of falling bombs
- [ ] Improve responsive design to avoid screen overflow issues

## Backlog

- [ ] Add new obstacles or bonuses with unique interactions *#designheavy*
- [ ] Add qualities for each cat
- [ ] Improve Pause function

## States and Screen Transitions

- **Start Screen**: Game title, cat selection, and Play button
- **Game Screen**: Main gameplay area with falling items
- **Game End Screen**: Displays final score and game outcome (win or lose)

## Links

- [Slides Link](https://www.figma.com/slides/fHisbpZIrt1HqZuNOrf2Tl/Happy-Cat-Presentation?node-id=1-42&t=AKLgDsD9CmF5EYrt-1)
- [Github repository Link](https://github.com/jumaber/happy_cat_oop)
- [Deployment Link](https://jumaber.github.io/happy_cat_oop/)
