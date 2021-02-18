import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
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

  const createNewBlog = async () => {
    const newBlog = await blogService.create({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
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
          <h2>Create new</h2>
          <BlogForm
            createNewBlog={createNewBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <Blogs blogs={blogs} />
        </>
      ) : (
        <>
          <Notification message={message} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      )}
    </>
  );
};

export default App;
