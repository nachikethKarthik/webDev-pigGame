'use strict';
let currentScore = 0;
// game state variable
let playing = true;
// if a player wins
let winner = function () {
  playerFramechanger = document.querySelector(
    `.player.player--${activePlayer}`
  );
  playerFramechanger.classList.remove(`player--active`);
  playerFramechanger.classList.add(`player--winner`);
  playing = false;
  dice.classList.add('hidden');
};
let removewinner = function () {
  currentScore = 0;
  playerFramechanger.classList.remove(`player--active`);
  playerFramechanger.classList.remove(`player--winner`);
  playerFramechanger = document.querySelector(
    `.player.player--${activePlayer}`
  );
  // removing black frame
  document.querySelector(`.player.player--0`).classList.add(`player--active`);
  // final scores to 0
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  // current scores to 0
  document.querySelector(`#current--1`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  activePlayer = 0;
  finalScores = [0, 0];
  playing = true;
};

// setting active player variable
let activePlayer = 0;
// current player score selector
let currentPlayerScore = document.querySelector(`#current--${activePlayer}`);
// final player scores
let playerScoreFinal = document.querySelector(`#score--${activePlayer}`);
// changes the frame aroung player to be more seen
let playerFramechanger = document.querySelector(
  `.player.player--${activePlayer}`
);
let changeActive = () => {
  currentScore = 0;
  // tracker variable for current score
  playerFramechanger = document.querySelector(
    `.player.player--${activePlayer}`
  );
  // removing frame for previous player
  playerFramechanger.classList.remove('player--active');
  currentPlayerScore = document.querySelector(`#current--${activePlayer}`);
  currentPlayerScore.textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  currentPlayerScore = document.querySelector(`#current--${activePlayer}`);
  playerFramechanger = document.querySelector(
    `.player.player--${activePlayer}`
  );
  playerFramechanger.classList.add('player--active');
  playerScoreFinal = document.querySelector(`#score--${activePlayer}`);
  // adding frame for current player
};
// declaring variables
let dice = document.querySelector('.dice');
// Button variables
let newGameButton = document.querySelector('.btn.btn--new');
let rollDiceButton = document.querySelector('.btn.btn--roll');
let holdButton = document.querySelector('.btn.btn--hold');
// setting final scores to zero
document.querySelector('#score--0').textContent = 0;
document.querySelector('#score--1').textContent = 0;
// final sscores are stored in an array
let finalScores = [0, 0];
// hiding the dice
dice.classList.add('hidden');
// current scores of players both in same variable as eack playes once not both at same time
//Roll dice button
const diceRoll = function () {
  if (playing) {
    let value = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${value}.png`; //changing src
    dice.classList.remove('hidden');
    if (value !== 1) {
      currentScore += value;
      currentPlayerScore = document.querySelector(`#current--${activePlayer}`);
      currentPlayerScore.textContent = currentScore;
      if (currentPlayerScore.textContent >= 50) {
        winner();
      }
    } else {
      // changes active player and selects required variables again
      changeActive();
    }
  }
};
rollDiceButton.addEventListener('click', diceRoll);
// when hold button clicked
let holdButtonClick = function () {
  if (playing) {
    finalScores[activePlayer] += Number(currentPlayerScore.textContent);
    playerScoreFinal = document.querySelector(`#score--${activePlayer}`);
    playerScoreFinal.textContent = finalScores[activePlayer];
    if (finalScores[activePlayer] >= 50) {
      winner();
    } else {
      changeActive();
    }
  }
};
holdButton.addEventListener('click', holdButtonClick);
// new game button
let newGamePressed = function () {
  removewinner();
};
newGameButton.addEventListener('click', newGamePressed);
