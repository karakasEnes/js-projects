'use strict';

const btnAgain = document.querySelector('.btn.again');
const btnCheck = document.querySelector('.btn.check');
const inputGuess = document.querySelector('.guess');

const labelHighScore = document.querySelector('.highscore');
const labelScore = document.querySelector('.score');
const labelMessage = document.querySelector('.message');

const labelQuestion = document.querySelector('.number');

let answer = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highestScore = 0;

// console.log('answer: ', answer);

const resetButton = () => {
  labelQuestion.textContent = '?';
  answer = Math.trunc(Math.random() * 20) + 1;
  inputGuess.value = '';
  score = 20;
  labelScore.textContent = score;
};

const updateHightScore = () => {
  if (score > highestScore) {
    highestScore = score;
  }

  if (highestScore === 0) {
    highestScore = score;
  }

  labelHighScore.textContent = highestScore;
};

const checkUserGuess = (guess) => {
  if (guess < 0 || guess > 20) {
    labelMessage.textContent = 'Invalid Input ⛔⛔';
    return;
  }

  if (guess > answer) {
    labelMessage.textContent = 'Too High';
    score -= 1;
    labelScore.textContent = score;
  }

  if (guess < answer) {
    labelMessage.textContent = 'Too Low';
    score -= 1;
    labelScore.textContent = score;
  }

  if (guess === answer) {
    labelMessage.textContent = 'Correct Guess! Gratz';
    labelQuestion.textContent = answer;
    updateHightScore();
    btnCheck.removeEventListener('click', handleCheck);
  }
};

const handleCheck = (e) => {
  const userGuess = parseInt(inputGuess.value);
  checkUserGuess(userGuess);
};

btnCheck.addEventListener('click', handleCheck);
btnAgain.addEventListener('click', resetButton);
