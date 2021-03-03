import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './reducers/userReducer';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import Greeting from './components/Greeting';
import Logout from './components/Logout';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      dispatch(authenticate(loggedUserJSON));
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          <Notification />
          <Greeting />
          <Logout />
          <Toggable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm />
          </Toggable>
          <Blogs />
        </>
      ) : (
        <>
          <Greeting />
          <Notification />
          <LoginForm />
        </>
      )}
    </>
  );
};

export default App;
