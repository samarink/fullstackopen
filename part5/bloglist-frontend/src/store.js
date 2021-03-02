import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogs from './reducers/blogsReducer';
import notification from './reducers/notificationReducer';

const reducer = combineReducers({
  blogs,
  notification,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
