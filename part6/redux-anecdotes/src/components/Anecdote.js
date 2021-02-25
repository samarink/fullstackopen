import React from 'react';

const Anecdote = ({ anecdote, hanleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={hanleClick}>vote</button>
      </div>
    </li>
  );
};

export default Anecdote;
