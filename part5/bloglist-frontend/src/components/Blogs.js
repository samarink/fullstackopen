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

export default Blogs;
