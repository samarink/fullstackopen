import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  const feedbackTotal = good + neutral + bad;
  const feedbackAverage = (good - bad) / feedbackTotal;
  const feedbackPositive = (good / feedbackTotal) * 100;

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
        <li>All: {feedbackTotal}</li>
        <li>Average: {feedbackAverage || 0}</li>
        <li>Positive: {feedbackPositive || 0}%</li>
      </ul>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App />, document.getElementById('root'));
