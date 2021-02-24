import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { anecdoteVote } from '../reducers/anecdoteReducer';
import { notificationFlush } from '../reducers/notificationReducer';

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

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((a) => a.content.toLowerCase().includes(filter))
  );

  const vote = (anecdote) => {
    dispatch(anecdoteVote({ ...anecdote, votes: anecdote.votes + 1 }));
    dispatch(notificationFlush(`you voted for '${anecdote.content}'`, 3));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            hanleClick={() => vote(anecdote)}
          />
        ))}
      </ul>
    </>
  );
};

export default AnecdoteList;
