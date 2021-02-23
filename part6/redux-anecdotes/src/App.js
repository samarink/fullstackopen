import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { anecdoteVote, anecdoteAdd } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(anecdoteVote(id));
  };

  const add = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';

    dispatch(anecdoteAdd(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <form onSubmit={add}>
        <h3>Add New</h3>

        Content:
        <input type="text" name="content" />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default App;

