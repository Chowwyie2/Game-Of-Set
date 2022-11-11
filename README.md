# Team-Exited-With-Code-0-JS-Game-Of-Set

# Abstract

This program is an implementation of the Game of Set: https://en.wikipedia.org/wiki/Set_(card_game). This game was coded using JavaScript, CSS, and HTML. This is intended to be a both a one player game to race against a timer and a two player game that can be played on the same keyboard, but with additional features to enhance the user experience.

# Table of Contents

- Overview
-  Player's Guide
- Code Guide
- Testing
- References

# Overview

## Project Notes

### Correctness

Both game modes play correctly under the official Game of Set rules found here: https://en.wikipedia.org/wiki/Set_(card_game).  

### Functionality and Features

This game is based in an interactive graphical user interface. The game also uses a mix of visual and audial cues to enhance player experience. Along with the a multiplayer mode, this program also contains a single-player mode where the player races against the timer to get as many sets as possible. For both modes, the game contains a hints system with two different types of hints and a statistics system to display player statistics. Along with this, there are customizable player names and timer.

### Style

All generated HTML and CSS code was validated in a CSS/HTML validator. The source code is indented and commented in code for readability.

<img width="1440" alt="Screen Shot 2022-11-04 at 7 00 34 PM" src="https://user-images.githubusercontent.com/112228359/200096719-79e45915-7990-498d-b376-f8f184f1a10a.png">
                                                                                                         
### Design

Functionality is seperated into into seperate individual JavaScript files and are linked to a single HTML file. Similarly, multiple stylesheets are used to style different elements for better modularity.

Overall, the project is modularized into many different directories:

Audio, Images, Javascripts, Stylesheets, Testing

### Testing

Testing was conducted on JavaScript files using Jest in a Node.js environment. With this plugin, unit tests were created for the player and card JavaScript files.

<img width="753" alt="test-success" src="https://user-images.githubusercontent.com/112228359/200098352-31ab87d8-1293-4f42-98fe-cc366bd2163f.png">

### Author Notes

When actions cannot be conducted, auditory cues are used to let the player know. This includes drawing more cards with 'd' when you cannot do so, asking for a selection hint when non are available, submitting a set when there are not exactly 3 cards selected, etc. 

## Features

This project is a redesign of The Game Of Set. It contains a full graphical user interface and a fully playable game in both single player and multiplayer mode. In single player mode, the player races against the timer to get as many sets before time runs out. In multiplayer mode, two players compete against each other to get the most sets.

The game used mix of visual and audial cues to enhance player experience. For both modes, the game contains a hints system with two different types of hints and a statistics system to display player statistics. Along with this, there are customizable player names and timer. Pop-ups are used to guide the players throughout the game experience.

View of the start screen:

<img width="1440" alt="menu" src="https://user-images.githubusercontent.com/112228359/200098313-b73b4b44-c7c3-47cd-8297-ce0c7be981a6.png">

Popup example:

<img width="1440" alt="popup-example" src="https://user-images.githubusercontent.com/112228359/200098330-30728920-b29a-48fa-9c92-261d5eb98dc7.png">
            
Single player mode:

<img width="1440" alt="Set Game Single Player Mode" src="https://user-images.githubusercontent.com/82902612/200092528-f0ce2192-9dfd-4f4b-9dce-aac9a69c7825.png">                                                                                            
Multiplayer mode:

<img width="1440" alt="Set Game Multiplayer Mode" src="https://user-images.githubusercontent.com/82902612/200092565-142c85dc-381b-4b12-b9a4-c421074a7a8a.png">
                                                             
## Possible Improvements

The selection hints used in multiplayer mode can be unfair because a player can take advantage of the selection hints. Other improvements include smoother card draw and select animations. 

## Technologies Used

HTML was used to create the base of the game. JavaScript was used to create the game logic and objects like cards, menus, and a score board. CSS was used to style the game. 

For testing, Node.js and jest were used for unit testing. To run tests, you must have Node.js downloaded. Follow this link to download the correct version for your system: https://nodejs.org/tr/. This download with also install NPM. From there, install jest with:
```
npm install --save-dev jest
```

# Player's Guide

After cloning the git repo, open game.html in a browser. A fully functional game should be playable in your browser.

Start the game by selecting either "Single player" or "Multiplayer" mode. Read the instructions carefully to understand the rules of your mode.

**Hot Keys:**
'h' - Card Selection Hint: Automatically selects a set of 3 on the board.
'n' - Number Hint: States how many sets are on the board.
's' - Statistics: Displays a board of a player's game statistics.
'd' - Draw Cards: Draws 3 new cards if there are no sets on the board.

**Single Player Mode:**
In this mode, the player races against the clock to get as many sets as they can before time runs out. Each time the player gets a set, more time is added to the clock. The player can adjust the difficulty by raising or lowering the time given after finding each set. The game ends when the timer hits 0 seconds.

To submit a set in this mode, the player must hit the 'enter' key.

**Multiplayer Mode:**
In this mode, two players face against each other to find as more sets than their opponent. Each time a player finds a set, 1 point is added to their score. The game ends when all of the cards in the deck have been drawn.

For player 1 to submit a set, hit the 'f' key. 
For player 2 to submit a set, hit the 'j' key.

# Code Guide

## Directory Structure

**audio:** Audio files and sound effects used in the game are contained in this folder.

**images:** Images and icons used in the game are contained in this folder. 

**javascripts:** All JavaScript files are in this folder. These files contain game objects and logic.

**stylesheets:** CSS stylesheet files that contain style guides for each JavaScript file.

**testing:** This folder contains testing files for certain JavaScript methods. Tests cover both front-end and back-end aspects of the game.

## Testing

The testing directory `testing` contains unit tests for the files `player.js` and `card-generation.js`, the engines for the game to construct a player while tracking and updating their statistics and produce a deck of set cards and monitor their amounts and relationships, respectively. These utilize the Node.js package Jest, a testing framework for Javascript. 
```
test('information about the test here', () => {
    expect(function(a,b)).toBe(answer);
});
```
Above is the syntax of a Jest unit test to assert the return value of a function.

To run the tests, enter the testing directory. If you don't have Node.js or jest installed, refer to the Technologies Used sections. Once you entered the testing directory, run:
```
npm test
```
to run your code.

# References

The program was based off of this version of The Game Of Set: 

https://en.wikipedia.org/wiki/Set_(card_game)

W3Schools was used to research HTML, JavaScript, and CSS:

https://www.w3schools.com/html/

https://www.w3schools.com/js/

https://www.w3schools.com/css/

Lastly, the images and audio resources used were from:

https://www.setgame.com/set/puzzle

https://pixabay.com/

and the background image was from https://www.vecteezy.com/?utm_source=google&utm_medium=cpc&utm_campaign=9780836522&utm_adgroup=102508356660&utm_keyword=vectezzy&gclid=CjwKCAjw8JKbBhBYEiwAs3sxNxQWcAnCQC3rqyXTWnLKzgDuCeUlthLyc8iM7pnmfX0ykgOqn55f9RoCrRYQAvD_BwE. The author was Kenya Aguirre.
