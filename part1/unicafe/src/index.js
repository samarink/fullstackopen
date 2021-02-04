import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={incrementGood} text="Good" />
      <Button handleClick={incrementNeutral} text="Neutral" />
      <Button handleClick={incrementBad} text="Bad" />
      <h2>Statistics</h2>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
      </ul>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById('root'));
