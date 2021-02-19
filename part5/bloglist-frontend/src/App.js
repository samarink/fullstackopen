import React, { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setMessage('Username or password incorrect');
      setTimeout(() => setMessage(null), 3000);
      console.log(exception);
    }
  };

  const handleLike = async (likeObject) => {
    const updatedObject = await blogService.update(likeObject);
    const newBlogs = blogs.map((b) =>
      b.id.toString() !== updatedObject.id.toString()
        ? b
        : { ...b, likes: b.likes + 1 }
    );

    setBlogs(newBlogs);
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    const newBlog = await blogService.create(blogObject);

    setBlogs([...blogs, newBlog]);
    setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <>
      {user ? (
        <>
          <Notification message={message} />
          <p>{user.username} is logged in</p>
          <button onClick={logout}>log out</button>
          <Toggable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog} />
          </Toggable>
          <Blogs blogs={blogs} handleLike={handleLike} />
        </>
      ) : (
        <>
          <Notification message={message} />
          <LoginForm handleLogin={handleLogin} />
        </>
      )}
    </>
  );
};

export default App;
