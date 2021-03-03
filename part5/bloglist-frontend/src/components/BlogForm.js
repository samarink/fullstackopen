import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blogAdd } from '../reducers/blogsReducer';
import { notificationSet } from '../reducers/notificationReducer';

const BlogForm = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(blogAdd({ title, author, url, user: user.id }));

    dispatch(notificationSet(`${title} has been added`));
    setTimeout(() => {
      dispatch(notificationSet(null));
    }, 5000);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new</h2>
      <form id="formDiv" onSubmit={handleSubmit}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </>
  );
};

export default BlogForm;
