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
    blogService
      .getAll()
      .then((blogs) => sortByLikes(blogs))
      .then((sorted) => setBlogs(sorted));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const sortByLikes = (arr) => arr.sort((a, b) => b.likes - a.likes);

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

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const handleLike = async (likeObject) => {
    const updatedObject = await blogService.update(likeObject);
    const newBlogs = blogs.map((b) =>
      b.id.toString() !== updatedObject.id.toString()
        ? b
        : { ...b, likes: b.likes + 1 }
    );

    const sortedBlogs = sortByLikes(newBlogs);
    setBlogs(sortedBlogs);
  };

  const handleDelete = async (blogObject) => {
    const str = `Remove blog ${blogObject.title} by ${blogObject.author}`;
    if (!window.confirm(str)) return;

    await blogService.remove(blogObject);

    const newBlogs = blogs.filter((b) => b.id !== blogObject.id);
    const sortedBlogs = sortByLikes(newBlogs);
    setBlogs(sortedBlogs);
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
          <Blogs blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} />
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
