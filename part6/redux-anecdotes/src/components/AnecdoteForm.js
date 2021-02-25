import React from 'react';
import { connect } from 'react-redux';
import { anecdoteAdd } from '../reducers/anecdoteReducer';
import { notificationFlush } from '../reducers/notificationReducer';

const AnecdoteForm = ({ dispatch }) => {
  const add = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';

    dispatch(anecdoteAdd(content));
    dispatch(notificationFlush(`'${content}' has been added`, 5));
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

export default connect()(AnecdoteForm);
