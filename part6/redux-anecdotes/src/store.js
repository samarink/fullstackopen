import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdotesReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
