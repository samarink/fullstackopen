import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdotesReducer from './reducers/anecdoteReducer';

const store = createStore(anecdotesReducer, composeWithDevTools());

export default store;
