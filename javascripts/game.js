/**************************** Data Structures to mantain Cards ****************************/
/* the currently selected cards */
const selectedCards = new Set();
/* the card deck */
const cardDeck = [];
/* lookup table for card_id to determine card information */
const cardLookupTable = [];


/*
Toggles card_id selection.
Requires:
    document.getElementById(card_id) exists.
Ensures: 
    if card_id not in selectedCards
        card_id in selectedCards
        document.getElementById(card_id) has class 'selected'
    else 
        card_id not in selectedCards
        document.getElementById(card_id) does not have class 'selected'
*/
function selectCard(card_id) {
    let card = document.getElementById(card_id);
    if (selectedCards.has(card_id)) {
        /* removes the selected card from the set of selected cards and removes the selected class attribute 
        on the card div */
        card.classList.remove('selected');
        selectedCards.delete(card_id);
    } else {
        /* adds the selected card to the set of selected cards and adds the selected class attribute 
        to the card div */
        selectedCards.add(card_id);
        card.classList.add('selected');
    }
    const card_select = new Audio('audio/card_select.wav');
    card_select.volume = 0.1;
    card_select.play();
}

/*
Processes keypresses and determines what action should be taken
Ensures: 
    if game_pause
        no action taken
*/
function keyListener(e) {
    /*
    If the game is currently paused, do not process any game actions.
    */
    if (game_pause) {
        return;
    }
    switch(e.which) {
        /*
        Enter key. Case: Solo player submits a set.
        */
        case 13:
            /*
            If game is in TWO_PLAYER_MODE, don't respond.
            */
            if (TWO_PLAYER_MODE) return;
            /*
            Don't submit if selectedCards aren't 3 cards
            */
            if (selectedCards.size != 3) {
                let negative_feedback = new Audio('audio/negative-feedback.wav');
                negative_feedback.volume = 0.15;
                negative_feedback.play();
            } else {
                let success = submitSet();
                soloplayer.updateScore(success);
                updateSoloScoreboard(success, false);
            }
        /*
        f key. Case: Player1 submits a set.
        */
        case 70:
            /*
            If game is in ONE_PLAYER_MODE, don't respond.
            */
            if (ONE_PLAYER_MODE) return;
            /*
            Don't submit if selectedCards aren't 3 cards
            */
            if (selectedCards.size != 3) {
                let negative_feedback = new Audio('audio/negative-feedback.wav');
                negative_feedback.volume = 0.15;
                negative_feedback.play();
            } else {
                player1.updateScore(submitSet());
                updateScoreboard();
            }
            break;
        /*
        f key. Case: Player2 submits a set.
        */
        case 74:
            if (ONE_PLAYER_MODE) return;
            if (selectedCards.size != 3) {
                let negative_feedback = new Audio('audio/negative-feedback.wav');
                negative_feedback.volume = 0.15;
                negative_feedback.play();
            } else {
                player2.updateScore(submitSet());
                updateScoreboard();
            }
            break;
        /*
        h key. Case: Player asks for selection hint
        */
        case 72:
            if (!checkBoardForSet(true)) {
                let negative_feedback = new Audio('audio/negative-feedback.wav');
                negative_feedback.volume = 0.15;
                negative_feedback.play();
            }
            break;
        /*
        n key. Case: Player asks for number hint
        */
        case 78:
            generateNumberHintPopup(checkBoardForSet());
            break;
        /*
        s key. Case: Player asks for statistics
        */
        case 83:
            generateStatisticsPopup();
            break;
        /*
        d key. Case: Player draws more cards
        */
        case 68:
            /*
            Ensures conditions have been met to draw cards.
            */
            if (!checkBoardForSet() && cardDeck.length >= 3) {
                drawMore();
            } else {
                const negative_feedback = new Audio('audio/negative-feedback.wav');
                negative_feedback.volume = 0.15;
                negative_feedback.play();
            }
            break;
        default:
        // code block
    }
    if (checkGameOver()) {
        gameOver();
    }
}

/*
Performs game actions that occur when player submits set.
Returns:
    true if there is a set, false if not set.
*/
function submitSet() {
    /*
    If the selected set is valid, perform card actions
    */
    if (checkSet()) {
        const success = new Audio('audio/success.wav');
        success.volume = 0.1;
        success.play();
        endTurn();
        return true;
    } else {
        /*
        If the selected set is invalid, clear the board selections
        */
        const incorrect = new Audio('audio/incorrect.mp3');
        incorrect.volume = 0.75;
        incorrect.play();
        clearSelections();
        return false;
    }
}

/*
Checks the board for sets and returns the total number of valid sets on the board. 
If select=true, two of the three cards of some arbitrary set will be selected.
*/
function checkBoardForSet(select = false) {
    total_sets = 0;
    let cardElementArray = Array.from(document.getElementsByClassName('card'));
    for(let i = 0; i < cardElementArray.length - 2; i++) {
        for(let j = i+1; j < cardElementArray.length - 1; j++) {
            for(let k = j+1; k < cardElementArray.length; k++) {
                /* goes to the lookup table to get the card informatiom for each id, checks if set matches */
                if (cardLookupTable[cardElementArray[i].id].matching_set(cardLookupTable[cardElementArray[j].id], cardLookupTable[cardElementArray[k].id])) {
                    if (select) {
                        /* clears the selections, and selects the cards */
                        clearSelections();
                        selectedCards.add(parseInt(cardElementArray[i].id));
                        cardElementArray[i].classList.add('selected');
                        selectedCards.add(parseInt(cardElementArray[j].id));
                        cardElementArray[j].classList.add('selected');
                    }
                    total_sets++;
                }
            }
        }
    }
    return total_sets;
}

/*
Ends the turn after a sucessful submission. Replaces the selected cards or removes them depending on the number
of cards on the board.
*/
function endTurn() {
    /*
    If the game is over, don't do anything.
    */
    if (checkGameOver()) return;
    if (document.getElementsByClassName('card').length == 12 && cardDeck.length >= 3) {
        replaceSelectedCards();
    } else {
        removeSelectedCards();
    }
}

/*
Checks if the selected cards are a set.
*/
function checkSet() {
    if (selectedCards.size == 3) {
        let selectedArr = Array.from(selectedCards);
        let card1 = cardLookupTable[selectedArr[0]];
        let card2 = cardLookupTable[selectedArr[1]];
        let card3 = cardLookupTable[selectedArr[2]];
        /* goes to the lookup table to get the card informatiom for each id, checks if set matches */
        return card1.matching_set(card2,card3 );
    }
    return false;
}

/*
Replaces the selected cards with new cards by changing the ids rather than remakeing card divs
*/
function replaceSelectedCards() {
    for(let card_id of selectedCards) {
        /* gets the id of the selectedCards and changes the div to the next card in the card deck */
        let card = document.getElementById(card_id);
        card.classList.remove('selected');
        const new_card_id = cardDeck.shift()
        card.setAttribute('id', new_card_id);
        card.onclick = function(){ selectCard(new_card_id); };
        card.removeChild(card.firstChild);
        card.appendChild(makeCardImg(new_card_id));
    }
    selectedCards.clear();
}

/*
Removes the selected cards
*/
function removeSelectedCards() {
    for(let card_id of selectedCards) {
        let card = document.getElementById(card_id);
        card.remove();
    }
    selectedCards.clear();
}

/*
Draws more cards and makes the card divs associated with them.
*/
function drawMore() {
    for (let i = 0; i<3; i++) {
        makeCardDiv(cardDeck.shift());
    }
}

/*
Clears all the selected cards from the game board and selectedCards sets.
*/
function clearSelections() {
    for(let card_id of selectedCards) {
        let card = document.getElementById(card_id);
        card.classList.remove('selected');
    }
    selectedCards.clear();
}

/*
Checks if the game is over
*/
function checkGameOver() {
    /*
    The game is over if there is no set on the board and there are no cards left in the card deck
    */
    return (!checkBoardForSet() && cardDeck.length == 0);
}

/*
Performs the game events on a game over.
*/
function gameOver() {
    /* Generates the game over popups */
    generateGameOverPopup();
    /* Depending on the mode, different players' records are updated */
    if (ONE_PLAYER_MODE) {
        soloplayer.updateRecord(1);
    } else {
        if (player1.current_score > player2.current_score) {
            player1.updateRecord(1);
            player2.updateRecord(-1);
        } else if (player2.current_score > player1.current_score) {
            player2.updateRecord(1);
            player1.updateRecord(-1);
        } else {
            player2.updateRecord(0);
            player1.updateRecord(0);
        }
    }
    /* starts new game */
    newGame();
}

/*
Starts a new game
*/
function newGame() {
    /* Clears the selected cards, the card display, and generates a new deck */
    selectedCards.clear();
    cleanCardDisplay(); 
    generateDeck();
    
    /* Draws 12 cards from the deck */
    for (let i = 1; i < 13; i++) {
        makeCardDiv(cardDeck.shift());
    }
}

/* adds event listeners to the document for key presses */
function initializeEventListeners() {
    document.addEventListener("keyup", function(e){keyListener(e)});
    document.getElementById('single-mode-button').addEventListener("mouseup", function(){menuSelect(true)});
    document.getElementById('two-mode-button').addEventListener("mouseup", function(){menuSelect(false)});
}

initializeEventListeners();
generateCardLookup();
newGame();



