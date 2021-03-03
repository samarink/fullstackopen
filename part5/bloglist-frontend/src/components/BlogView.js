import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { blogLike, blogDelete } from '../reducers/blogsReducer';
import blogService from '../services/blogs';

const BlogView = () => {
  const id = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogService.getById(id).then((blog) => setBlog(blog));
  }, [id]);

  if (!blog) return null;

  const createdByCurrentUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (!loggedUserJSON) return false;

    const currentUser = JSON.parse(loggedUserJSON);
    return currentUser.id === blog.user.id;
  };

  const { title, url, author, likes } = blog;

  return (
    <div>
      <h2>
        {title} {author}
      </h2>
      <a href={url}>{url}</a>
      <div>
        {likes} likes{' '}
        <button onClick={() => dispatch(blogLike(blog))}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {createdByCurrentUser() && (
        <button
          onClick={() => {
            dispatch(blogDelete(blog));
            history.push('/');
          }}
        >
          delete
        </button>
      )}
    </div>
  );
};

export default BlogView;
