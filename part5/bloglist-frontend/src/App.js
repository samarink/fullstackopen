import React, { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

import { notificationSet } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);

      setUser(user);

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(notificationSet('username or password incorrect'));
      setTimeout(() => {
        dispatch(notificationSet(null));
      }, 5000);
      console.log(exception);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          <Notification />
          <p>{user.username} is logged in</p>
          <button onClick={logout}>log out</button>
          <Toggable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Toggable>
          <Blogs />
        </>
      ) : (
        <>
          <Notification />
          <LoginForm handleLogin={handleLogin} />
        </>
      )}
    </>
  );
};

export default App;
