
/* updates the 2 player scoreboard with the p1, p2 current scores */
function updateScoreboard() {
    // cleanScoreboard();
    let p1scorename = document.getElementById('p1scorename');
    p1scorename.innerHTML = player1.name;
    let p2scorename = document.getElementById('p2scorename');
    p2scorename.innerHTML = player2.name;
    let p1score = document.getElementById('p1score');
    p1score.innerHTML = player1.current_score;
    let p2score = document.getElementById('p2score');
    p2score.innerHTML = player2.current_score;
}

/* Decrements the time remaining on the scoreboard and determines if the game is over.*/
function decrementSoloScoreboard() {
    if (TWO_PLAYER_MODE || game_pause) return;
    let time_remaining = document.getElementById('time-remaining');
    time_remaining.innerHTML = time_remaining.innerHTML - 1;
    if (time_remaining.innerHTML <= 0) {
        generateGameOverPopup();
        /* if the game is over, updates the player */
        soloplayer.updateRecord(-1);
    }
}

/* updates the solo scoreboard with the solo scores and decrements time remaining  */
function updateSoloScoreboard(success = false, nochange = true) {
    document.getElementById('soloscorename').innerHTML = soloplayer.name;
    document.getElementById('soloscore').innerHTML = soloplayer.current_score;
    let time_remaining = document.getElementById('time-remaining');
    if (!nochange) {
        if (success) {
            document.getElementById('time-remaining').innerHTML = parseInt(time_remaining.innerHTML) + time_increment;
        } else {
            document.getElementById('time-remaining').innerHTML = parseInt(time_remaining.innerHTML) - 10;
        }
    }
}

/* every second, the scoreboard should be decremented. */
setInterval(decrementSoloScoreboard, 1000);