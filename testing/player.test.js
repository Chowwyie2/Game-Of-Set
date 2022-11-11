
const Player = require('./player');
let testPlayer;

beforeEach(() => {
  testPlayer = new Player.Player("test");
});

//Test of the player constructor to assert the initial score is zeroed
test('Constructor zeros current score', () => {
    expect(testPlayer.current_score).toBe(0);
});

//Test of the player constructor to assert the initial total correct is zeroed
test('Constructor zeros total correct', () => {
    expect(testPlayer.total_correct).toBe(0);
});

//Test of the player constructor to assert the initial total wrong is zeroed
test('Constructor zeros total wrong', () => {
    expect(testPlayer.total_wrong).toBe(0);
});

//Test of the player constructor to assert the initial wins is zeroed
test('Constructor zeros total wins', () => {
    expect(testPlayer.total_wins).toBe(0);
});

//Test of the player constructor to assert the initial losses is zeroed
test('Constructor zeros total losses', () => {
    expect(testPlayer.total_losses).toBe(0);
});

//Test of the player constructor to assert the initial games is zeroed
test('Constructor zeros total games', () => {
    expect(testPlayer.total_games).toBe(0);
});

//Test to see that the correct guess increased the player's current score
test('Correct guess increments current score', () => {
    //Creating a correct guess for the test player
    testPlayer.updateScore(true);
    expect(testPlayer.current_score).toBe(1);
});

//Test to see that the correct guess increased the player's total correct guesses
test('Correct guess increments total correct', ()=> {
    //Creating a correct guess for the test player
    testPlayer.updateScore(true);
    expect(testPlayer.total_correct).toBe(1);
});


//Test to see that the incorrect guess increased the player's total incorrect guesses
test('Incorrect guess increments total wrong', () => {
    //Creating an incorrect guess for the test player
    testPlayer.updateScore(false);
    expect(testPlayer.total_wrong).toBe(1);
});

//Test to see that the incorrect guess decreased the player's current score
test('Incorrect guess decrements current score', () => {
    //Creating an incorrect guess for the test player
    testPlayer.updateScore(false);
    expect(testPlayer.current_score).toBe(-1);
});

//Test to see that the win increased the player's total wins
test('Win increments total wins', () => {
    //Creating a winning round for the test player
    testPlayer.updateRecord(1); 
    expect(testPlayer.total_wins).toBe(1);
});

//Test to see that the win increased the player's total games played
test('Win increments total games', () => {
    //Creating a winning round for the test player
    testPlayer.updateRecord(1); 
    expect(testPlayer.total_games).toBe(1);
});

//Test to see that the win cleared the player's current score
test('Win zeroes current score', () => {
    //Creating a winning round for the test player
    testPlayer.updateRecord(1); 
    expect(testPlayer.current_score).toBe(0);
});



//Test to see that the loss increased the player's total losses
test('Loss increments total losses', () => {
    //Creating a loss for the test player
    testPlayer.updateRecord(-1);
    expect(testPlayer.total_losses).toBe(1);
});

//Test to see that the loss increased the player's total games played
test('Loss increments total games', () => {
    //Creating a loss for the test player
    testPlayer.updateRecord(-1);
    expect(testPlayer.total_games).toBe(1);
});

//Test to see that the loss cleared the player's current score
test('Loss zeroes current score', () => {
    //Creating a loss for the test player
    testPlayer.updateRecord(-1);
    expect(testPlayer.current_score).toBe(0);
});
