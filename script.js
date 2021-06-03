'use strict';

//button elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const img = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const playerScore0 = document.querySelector('#score--0');
const playerScore1 = document.querySelector('#score--1');

let currentScore = 0;
let totalScore0 = 0;
let totalScore1 = 0;

img.classList.add('hidden');

const displayDiceRoll = number => {
  switch (number) {
    case 1:
      img.src = 'dice-1.png';
      break;
    case 2:
      img.src = 'dice-2.png';
      break;
    case 3:
      img.src = 'dice-3.png';
      break;
    case 4:
      img.src = 'dice-4.png';
      break;
    case 5:
      img.src = 'dice-5.png';
      break;
    case 6:
      img.src = 'dice-6.png';
      break;
  }
};

const displayNewScore = number => {
  currentScore += number;
  if (player0.classList.contains('player--active')) {
    currentScore0.textContent = currentScore;
  }
  if (player1.classList.contains('player--active')) {
    currentScore1.textContent = currentScore;
  }
};

const switchPlayer = () => {
  currentScore = 0;
  if (player0.classList.contains('player--active')) {
    currentScore0.textContent = currentScore;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    currentScore1.textContent = currentScore;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
};

const rollDice = () => {
  //generate a random dice roll
  const number = Math.trunc(Math.random() * 6) + 1;
  //display dice roll
  img.classList.remove('hidden');
  displayDiceRoll(number);

  if (number === 1) {
    //switch to next player
    switchPlayer();
  } else {
    //add dice to current score
    displayNewScore(number);
  }
};

const displayTotalScore = () => {
  if (player0.classList.contains('player--active')) {
    totalScore0 += currentScore;
    playerScore0.textContent = totalScore0;
    if (totalScore0 >= 100) {
      playerScore0.textContent = '🎉';
      btnHold.disabled = true;
      btnRoll.disabled = true;
      btnHold.classList.add('opacity');
      btnRoll.classList.add('opacity');
    } else {
      switchPlayer();
    }
  } else {
    totalScore1 += currentScore;
    playerScore1.textContent = totalScore1;
    if (totalScore1 >= 100) {
      playerScore1.textContent = '🎉';
      btnHold.disabled = true;
      btnRoll.disabled = true;
      btnHold.classList.add('opacity');
      btnRoll.classList.add('opacity');
    } else {
      switchPlayer();
    }
  }
};

const reset = () => {
  currentScore = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  img.classList.add('hidden');
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
  playerScore0.textContent = totalScore0;
  playerScore1.textContent = totalScore1;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  btnHold.classList.remove('opacity');
  btnRoll.classList.remove('opacity');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', displayTotalScore);
btnNew.addEventListener('click', reset);
