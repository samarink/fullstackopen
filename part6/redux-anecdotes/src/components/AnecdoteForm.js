import React from 'react';
import { useDispatch } from 'react-redux';
import { anecdoteAdd } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdote';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';

    const newAnecdote = await anecdoteService.create(content);
    dispatch(anecdoteAdd(newAnecdote));
  };

  return (
    <form onSubmit={add}>
      <h3>Add New</h3>
      Content:
      <input type="text" name="content" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
