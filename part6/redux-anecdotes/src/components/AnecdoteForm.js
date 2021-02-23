import React from 'react';
import { useDispatch } from 'react-redux';
import { anecdoteAdd } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';

    dispatch(anecdoteAdd(content));
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
