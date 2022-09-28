"use strict";

//ELEMENTS
const totalScore0 = document.querySelector("#score--0");
const totalScore1 = document.getElementById("score--1"); //you can also select an id by using getElementById
const diceImg = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//STARTING CONDITIONS
totalScore0.textContent = 0;
totalScore1.textContent = 0;
diceImg.classList.add("hidden");

let currentscore = 0;
let Score = [0, 0];
let activePlayer = 0;
let playing = true;

//FUNCTIONS
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //IF ACTIVE PLAYER = 0,SWITCH TO 1 OR IF ACTIVE PLAYER=1 THEN SWITCH TO 0

  //TOGGLE TO SWITCH THE BACKGROUND COLOUR OF THE ACTIVE PLAYER
  player0.classList.toggle("player--active"); //TOGGLE ADDS A SELECTED CLASS IF IT IS NOT THERE AND REMOVES THE SELECTED CLASS IF IT IS THERE
  player1.classList.toggle("player--active"); //IN THIS SCENARIO WHEN THE ACTIVE PLAYER SWITCHES TO 1 THE ACTIVE PLATER CLASS IS REMOVED FROM PLAYER0 AND ADDED TO PLAYER1
};

//RANDOM DICE ROLL
buttonRoll.addEventListener("click", function () {
  if (playing) {
    //THE CODE ONLY EXECUTES IF PLAYING IS TRUE
    //1.GENERATE A RANDOM DICE ROLL
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(typeof diceNumber, diceNumber);

    //2.DISPLAY DICE ROLL
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${diceNumber}.png`;

    //3.ADD THE VALUE OF THE DICE ROLL TO THE CURRENT SCORE IF THE VALUE IS NOT 1
    if (diceNumber !== 1) {
      currentscore = currentscore + diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = currentscore; //THIS SPECIFICALLY KEEPS SCORE FOR THE ACTIVE PLAYER
      //document.getElementById(`current--${activePlayer}`).textContent = currentscore;
    } else {
      //IF THE VALUE IS 1 THEN RESET THE SCORE TO 0 AND SWITCH ACTIVE PLAYERS
      switchPlayer();
    }
  }
});

//HOLD BUTTON
buttonHold.addEventListener("click", function () {
  //1.ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE
  Score[activePlayer] = Score[activePlayer] + currentscore;
  document.getElementById(`score--${activePlayer}`).textContent = Score[activePlayer];
  // document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // currentscore = 0;
  console.log(Score[activePlayer]);
  //switchPlayer();

  if (playing) {
    //2.CHECK IF ACTIVE PLAYERS SCORE IS >= 100,IF IT IS THEN END THE GAME
    if (Score[activePlayer] >= 20) {
      //END THE GAME AND SHOW THE WINNER
      playing = false; //WHEN A PLAYER REACHES THE REQUIRED NUMBER OF POINTS PLAYING CHANGES TO FALSE TO END THE GAME,WHEN PLAYING IS FALSE ALL BUTTONS STOP FUNCTIONING AS THE GAME HAS ENDED
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      diceImg.classList.add("hidden");
      currentscore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = currentscore;
    } else {
      //3.IF ACTIVE PLAYERS SCORE IS NOT UP TO 100 THEN SWITCH TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});

//RESETTING THE GAME
buttonNew.addEventListener("click", function () {
  //PLAYING STATE
  playing = true;

  //DICE IMAGE
  diceImg.classList.add("hidden");

  //TOTAL SCORE
  Score[0] = 0;
  Score[1] = 0;
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;

  //CURRENT SCORE
  currentscore = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  //WINNER
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
});
