import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './reducers/userReducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import Greeting from './components/Greeting';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Users from './components/Users';
import UserView from './components/UserView';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      dispatch(authenticate(loggedUserJSON));
    }
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <Router>
            <Navbar />
            <Notification />
            <Greeting />
            <Logout />

            <Switch>
              <Route path="/users/:id">
                <UserView />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Toggable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm />
                </Toggable>
                <Blogs />
              </Route>
            </Switch>
          </Router>
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
