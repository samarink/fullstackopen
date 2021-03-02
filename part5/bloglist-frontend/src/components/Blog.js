import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { blogLike, blogDelete } from '../reducers/blogsReducer';
import { notificationSet } from '../reducers/notificationReducer';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const { title, author, url, likes, user } = blog;

  const dispatch = useDispatch();
  const [fullView, setFullView] = useState(false);
  const toggleFullView = () => setFullView(!fullView);

  const createdByCurrentUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (!loggedUserJSON) return false;

    const currentUser = JSON.parse(loggedUserJSON);
    return currentUser.id === user.id;
  };

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(blogLike({ ...blog, likes: blog.likes + 1, user: user.id }));
    dispatch(notificationSet(`${blog.title} has been liked`));
    setTimeout(() => {
      dispatch(notificationSet(null));
    }, 5000);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(blogDelete(blog));
    dispatch(notificationSet(`${blog.title} has been deleted`));
    setTimeout(() => {
      dispatch(notificationSet(null));
    }, 5000);
  };

  return (
    <div className="blog-div" style={blogStyle}>
      {fullView ? (
        <div>
          <p>
            {title} {author}
          </p>
          {url}
          <p>
            {likes}
            <button onClick={handleLike}>like</button>
          </p>
          {createdByCurrentUser() && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      ) : (
        <div className="blog-div">
          <p>
            {title} {author}
          </p>
        </div>
      )}
      <button onClick={toggleFullView}>{fullView ? 'hide' : 'show'}</button>
    </div>
  );
};

export default Blog;
