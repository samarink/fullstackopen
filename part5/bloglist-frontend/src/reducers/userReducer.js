import loginService from '../services/login';
import blogService from '../services/blogs';
import { notificationSet } from './notificationReducer';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
};

export const userSet = (user) => ({
  type: 'SET_USER',
  user,
});

export const login = (userObject) => async (dispatch) => {
  try {
    const user = await loginService.login(userObject);
    blogService.setToken(user.token);

    dispatch(userSet(user));

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
  } catch (exception) {
    dispatch(notificationSet('username or password incorrect'));
    setTimeout(() => {
      dispatch(notificationSet(null));
    }, 5000);

    console.log(exception);
  }
};

export const authenticate = (userJSON) => async dispatch => {
  const user = JSON.parse(userJSON);
  dispatch(userSet(user));
  blogService.setToken(user.token);
};

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser');
  dispatch(userSet(null));
};

export default reducer;
