import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { anecdoteVote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';

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

  const vote = ({ id, content }) => {
    dispatch(anecdoteVote(id));

    const notification = `you voted for '${content}'`;
    dispatch(notificationChange(notification));
    setTimeout(() => {
      dispatch(notificationChange(null));
    }, 5000);
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
