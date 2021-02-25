import React from 'react';
import { connect } from 'react-redux';
import { anecdoteVote } from '../reducers/anecdoteReducer';
import { notificationFlush } from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdoteList = ({ dispatch, anecdotes }) => {
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((a) => a.content.toLowerCase().includes(state.filter)),
  };
};

export default connect(mapStateToProps)(AnecdoteList);
