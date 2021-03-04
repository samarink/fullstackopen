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
  const [text, setText] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await blogService.addComment(blog.id, text);
    setText('');
    setBlog({ ...blog, comments: [...blog.comments, newComment] });
  };

  const { title, url, author, likes, comments } = blog;

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">comment</label>
        <div>
          <textarea
            id="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button>submit</button>
      </form>
      <h2>comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
