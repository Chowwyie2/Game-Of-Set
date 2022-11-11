/* 
A Player class that represents a Player and provides methods for recording player history.
*/
class Player {
    constructor(name) {
        this.name = name;
        this.current_score = 0;
        this.total_correct = 0;
        this.total_wrong = 0;
        this.total_wins = 0;
        this.total_losses = 0;
        this.total_games = 0;
    }

    /* 
    Updates the player score based on turn success
    Requires:
        turnSuccess is a boolean
    Ensures:
        player correct and score updated correctly
    */
    updateScore(turnSuccess) {
        if (turnSuccess) {
            this.total_correct++;
            this.current_score++;
        } else {
            this.total_wrong++;
            this.current_score--;
        }
    }

    /* 
    Updates the player record based on game success
    Requires:
        gameSuccess is a boolean
    Ensures:
        player record updated correctly
    */
    updateRecord(gameSuccess) {
        if (gameSuccess == 1) {
            this.total_wins++;
        } else if (gameSuccess == -1) {
            this.total_losses++;
        } 
        this.current_score = 0;
        this.total_games++;
    }

    /*
    Returns an object with calculated statistics to be printed.
    */
    statistics() {
        const correctPercent = (this.total_correct + this.total_wrong)? parseFloat(this.total_correct/(this.total_correct + this.total_wrong)*100).toFixed(2)+"%":"0.00%";
        return {"Player Name": this.name, "Current Score": this.current_score, "Total Correct": this.total_correct, "Total Incorrect": this.total_wrong, "Correct Percentage": correctPercent, "Total Wins": this.total_wins, "Total Loses": this.total_losses, "Total Games": this.total_games};
    }
}
