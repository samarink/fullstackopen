import PropTypes from 'prop-types';
import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, handleLike, handleDelete }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    ))}
  </div>
);

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blogs;
