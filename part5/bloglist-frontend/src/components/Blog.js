import PropTypes from 'prop-types';
import React, { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike, handleDelete }) => {
  const { title, author, url, likes, user } = blog;

  const [fullView, setFullView] = useState(false);

  const toggleFullView = () => setFullView(!fullView);

  const createdByCurrentUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (!loggedUserJSON) return false;

    const currentUser = JSON.parse(loggedUserJSON);

    return currentUser.username === user.username;
  };

  const handleLikeSubmit = async (event) => {
    event.preventDefault();

    handleLike({ ...blog, likes: blog.likes + 1, user: user.id });
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();

    handleDelete(blog);
  };

  return (
    <div style={blogStyle}>
      {fullView ? (
        <div>
          <p>
            {title} {author}
          </p>
          <a href={url}>read</a>
          <p>
            {likes}
            <button onClick={handleLikeSubmit}>like</button>
          </p>
          {createdByCurrentUser() && (
            <button onClick={handleDeleteSubmit}>remove</button>
          )}
        </div>
      ) : (
        <div>
          <p>
            {title} {author}
          </p>
        </div>
      )}
      <button onClick={toggleFullView}>{fullView ? 'hide' : 'show'}</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
