/* Player1, Player2, and SoloPlayer are the players the game updates */
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
const soloplayer = new Player("Solo Player");

/* Booleans to determine the game mode */
let ONE_PLAYER_MODE = false;
let TWO_PLAYER_MODE = false;
let time_increment = 0;

/* Boolean that toggles game pause */
let game_pause = true;

/* toggles visibility of id and updates scoreboard. */
function popupToggle(id) {
    const click = new Audio('audio/click.wav');
    click.volume = 0.1;
    click.play();
    let popup = document.getElementById(id);
    popup.remove();
    document.getElementById('disable-backdrop').style.visibility = 'hidden';
    /* updates respective scoreboard */
    if (TWO_PLAYER_MODE) {
        updateScoreboard();
    } else {
        updateSoloScoreboard();
    }
    game_pause = false;
}

/* 
Generates a div with the popup class
Returns:
    Created popup node
*/
function generatePopup(id) {
    game_pause = true;
    document.getElementById('disable-backdrop').style.visibility = 'visible';
    let popup = document.createElement('div');
    popup.setAttribute('id', id);
    popup.classList.add('popup');
    document.body.appendChild(popup);
    return popup;
}

/* registers a botton that toggles visibility of div with id */
function generatePopupCloseButton(popupid, text) {
    let popup = document.getElementById(popupid);
    let popup_button = document.createElement('div');
    popup_button.classList.add('popup-button');
    popup_button.innerHTML = text;
    popup.appendChild(popup_button);
    popup_button.onclick = function(){ popupToggle(popup.id); };
    return popup_button;
}

/* creates a popup with the statistics for the players */
function generateStatisticsPopup() {
    let popupid = 'statistics';
    let popup = generatePopup(popupid);
    popup.innerHTML += '<h1>Statistics</h1>';
    /* depending on the current mode, different statistics are shown */
    if (TWO_PLAYER_MODE) {
        const player1_stats = player1.statistics();
        for (const player_stat in player1_stats) {
            let player1stat = document.createElement('p');
            player1stat.innerHTML = player_stat + ': ' + player1_stats[player_stat];
            popup.appendChild(player1stat);
        }
        popup.innerHTML += '<hr>';
        const player2_stats = player2.statistics();
        for (const player_stat in player2_stats) {
            let player2stat = document.createElement('p');
            player2stat.innerHTML = player_stat + ': ' + player2_stats[player_stat];
            popup.appendChild(player2stat);
        }
    } else {
        const solo_stats = soloplayer.statistics();
        for (const player_stat in solo_stats) {
            let solostat = document.createElement('p');
            solostat.innerHTML = player_stat + ': ' + solo_stats[player_stat];
            popup.appendChild(solostat);
        }
    }
    generatePopupCloseButton(popupid, 'Got it!');

}

/* creates a popup with the number of sets on the board */
function generateNumberHintPopup(numberOfSets) {
    let popupid = 'number-hint';
    let popup = generatePopup(popupid);
    popup.innerHTML += '<h1>Number Hint</h1>';
    popup.innerHTML += '<p>There are ' + numberOfSets + ' valid sets on the board! </p>';
    /* prompts user to draw more if there are no sets. */
    if(!numberOfSets) popup.innerHTML += "<p>Draw more cards with 'd'</p>";
    generatePopupCloseButton(popupid, 'Got it!');
}

/* Generates game over popup */
function generateGameOverPopup() {
    let popupid = 'game-over';
    let popup = generatePopup(popupid);
    popup.innerHTML += '<h1>Game Over!</h1>'
    /* depending on the current mode, different prompts are shown */
    if (TWO_PLAYER_MODE) {
        if (player1.current_score > player2.current_score) {
            popup.innerHTML += '<p>' + player1.name +  ' wins!</p>';
        } else if (player2.current_score > player1.current_score) {
            popup.innerHTML += '<p>' + player2.name +  ' wins!</p>';
        } else {
            popup.innerHTML += "<p>It's a tie!</p>";
        }
    } else {
        /* depending on the time left, determines what message to print */
        if (document.getElementById('time-remaining').innerHTML <= 0) {
            popup.innerHTML += '<p>Sorry ' + soloplayer.name +  ', you lose...</p>';
        } else {
            popup.innerHTML += '<p>Congrats ' + soloplayer.name +  ', you win!</p>';
        }
        document.getElementById('time-remaining').innerHTML = 50;
    }
    generatePopupCloseButton(popupid, 'New Game!');
}

/* assigns player names in 2p mode based on the given text input */
function assignPlayerNames() {
    if (document.getElementById("p1name").value) {
        player1.name = document.getElementById("p1name").value;
    }
    if (document.getElementById("p2name").value) {
        player2.name = document.getElementById("p2name").value;
    }
}

/* Generates 2 player mode popup */
function generateTwoPlayerPopup() {
    TWO_PLAYER_MODE = true;
    document.getElementById('two-player-scoreboard').style.visibility = 'visible';
    let popupid = 'two-player';
    let popup = generatePopup(popupid);
    popup.innerHTML += '<h1>2 Player Mode</h1>'
    popup.innerHTML += '<p>Go toe-to-toe with another player in 2 player mode!</p>'
    popup.innerHTML += '<p>When a player finds a set, select the set and submit the set with your button!</p>'
    popup.innerHTML += "<p>Player 1 submit keypress: 'f'</p>"
    popup.innerHTML += "<p>Player 2 submit keypress: 'j'</p>"
    popup.innerHTML += '<label for="p1name">Enter Player 1 Name: </label><input type="text" id="p1name" value="Player 1"><br>'
    popup.innerHTML += '<label for="p2name">Enter Player 2 Name: </label><input type="text" id="p2name" value="Player 2">'

    let popup_button = document.createElement('div');
    popup_button.classList.add('popup-button');
    popup_button.innerHTML = 'Ready!';
    popup.appendChild(popup_button);
    /* assigns player's names to the players */
    popup_button.addEventListener('click', function(){ assignPlayerNames(); }, false);
    popup_button.addEventListener('click', function(){ popupToggle(popupid); }, false);
}

/* assigns solo adjustable time and player name */
function assignSoloValues() {
    if (parseInt(document.getElementById("time-increment").value) >= 0) {
        time_increment = parseInt(document.getElementById("time-increment").value);
    }
    if (document.getElementById("soloname").value) {
        soloplayer.name = document.getElementById("soloname").value;
    }
}

/* Generates 1 player mode popup */
function generateOnePlayerPopup() {
    ONE_PLAYER_MODE = true;
    document.getElementById('one-player-scoreboard').style.visibility = 'visible';
    let popupid = 'one-player';
    let popup = generatePopup(popupid);
    popup.innerHTML += '<h1>1 Player Mode</h1>'
    popup.innerHTML += '<p>Challenge yourself in 1 player mode!</p>'
    popup.innerHTML += "<p>Race against the clock and get through the deck before time expires</p>"
    popup.innerHTML += "<p>When you find a set, select the set with the mouse and submit the set with the 'enter' key!</p>"
    popup.innerHTML += "<p>When you submit a valid set, the time increases by the time increment!</p>"
    popup.innerHTML += "<p>Watch out! When you submit a wrong set, the time goes down by 10 seconds, so be careful!</p>"
    popup.innerHTML += '<label for="time-increment">To make it more difficult, change the time you get after each set! Must be a valid positive number: </label><input type="text" id="time-increment" value="20"><br><br>'
    popup.innerHTML += '<label for="p2name">Enter Player Name: </label><input type="text" id="soloname" value="Solo Player">'
    let popup_button = document.createElement('div');
    popup_button.classList.add('popup-button');
    popup_button.innerHTML = 'Ready!';
    popup.appendChild(popup_button);
    /* assigns solo mode values, then toggles popup */
    popup_button.addEventListener('click', function(){ assignSoloValues(); }, false);
    popup_button.addEventListener('click', function(){ popupToggle(popupid); }, false);
}

/* 
Selects which popup to generate based on singleMode
Requires:
    singleMode is a boolean
*/
function menuSelect(singleMode) {
    let menu = document.getElementById('game-select-popup');
    menu.style.visibility = 'hidden';
    if (singleMode) {
        generateOnePlayerPopup();
    } else {
        generateTwoPlayerPopup();
    }
}

