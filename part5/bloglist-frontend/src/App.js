import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './reducers/userReducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import Navbar from './components/Navbar';
import Users from './components/Users';
import UserView from './components/UserView';
import BlogView from './components/BlogView';

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
    <Container>
      {user ? (
        <>
          <Router>
            <Navbar />
            <Notification />

            <Switch>
              <Route path="/users/:id">
                <UserView />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/blogs/:id">
                <BlogView />
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
          <Notification />
          <LoginForm />
        </>
      )}
    </Container>
  );
};

export default App;
