import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0));

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteForAnecdote = (idx) => {
    const copy = [...scores];
    copy[idx] += 1;
    setScores(copy);
  };

  const mostVotes = scores.indexOf(Math.max(...scores));

  return (
    <>
      <Anecdote
        headline="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={scores[selected]}
      />
      <Anecdote
        headline="Anecdote with most votes"
        anecdote={anecdotes[mostVotes]}
        votes={scores[mostVotes]}
      />
      <Button text="next anecdote" handleClick={nextAnecdote} />
      <Button
        text="vote for anecdote"
        handleClick={() => voteForAnecdote(selected)}
      />
    </>
  );
};

const Anecdote = ({ headline, anecdote, votes }) => (
  <>
    <h2>{headline}</h2>
    <p>{anecdote}</p>
    <p>Has {votes} votes</p>
  </>
);

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
