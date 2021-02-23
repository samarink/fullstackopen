import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { anecdoteVote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, hanleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={hanleClick}>vote</button>
      </div>
    </>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          hanleClick={() => dispatch(anecdoteVote(anecdote.id))}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
