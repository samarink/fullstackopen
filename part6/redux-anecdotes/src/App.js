import React, { useEffect } from 'react';
import anecdoteService from './services/anecdote';
import { useDispatch } from 'react-redux';
import { anecdoteInit } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(anecdoteInit(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
