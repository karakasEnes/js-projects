import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [answer, setAnswer] = useState(Math.trunc(Math.random() * 20) + 1);
  const [userGuess, setUserGuess] = useState('');
  const [highestScore, setHighestScore] = useState(0);
  const [score, setScore] = useState(20);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    console.log('answer!:', answer);
  }, [answer]);

  const feedbackRef = useRef(null);
  const checkBtnRef = useRef(null);
  const answerRef = useRef(null);
  const bodyRef = useRef(null);

  const resetGame = () => {
    setAnswer(Math.trunc(Math.random() * 20) + 1);
    setScore(20);
    setIsAnswerCorrect(false);
    answerRef.current.textContent = '?';
    setUserGuess('');
    bodyRef.current.style.backgroundColor = 'rgb(34, 34, 34)';
  };

  const handleHighScore = () => {
    if (score > highestScore) {
      setHighestScore(score);
      setIsAnswerCorrect(true);
      answerRef.current.textContent = answer;
      bodyRef.current.style.backgroundColor = 'rgb(32, 201, 16)';
    }
  };

  const handleCheck = () => {
    if (userGuess < 0 || userGuess > 20) {
      feedbackRef.current.textContent = 'Invalid guess! ⛔⛔⛔⛔⛔';
      return;
    }

    if (userGuess > answer) {
      feedbackRef.current.textContent = 'Too High!';
      setScore(score - 1);
    }

    if (userGuess < answer) {
      feedbackRef.current.textContent = 'Too Low!';
      setScore(score - 1);
    }

    if (userGuess === answer) {
      feedbackRef.current.textContent = 'Correct Answer, gratz!';
      handleHighScore();
    }
  };

  return (
    <div className='App' ref={bodyRef}>
      <header>
        <h1>Guess My Number!</h1>
        <p className='between'>(Between 1 and 20)</p>
        <button onClick={resetGame} className='btn again'>
          Again!
        </button>
        <div ref={answerRef} className='number'>
          ?
        </div>
      </header>
      <main>
        <section className='left'>
          <input
            value={userGuess}
            onChange={(e) => setUserGuess(parseInt(e.target.value))}
            type='number'
            className='guess'
          />
          <button
            ref={checkBtnRef}
            onClick={isAnswerCorrect ? () => {} : handleCheck}
            className='btn check'
          >
            Check!
          </button>
        </section>
        <section className='right'>
          <p ref={feedbackRef} className='message'>
            Start guessing...
          </p>
          <p className='label-score'>
            💯 Score: <span className='score'>{score}</span>
          </p>
          <p className='label-highscore'>
            🥇 Highscore: <span className='highscore'>{highestScore}</span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
