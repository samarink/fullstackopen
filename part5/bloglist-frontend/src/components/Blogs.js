import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, handleLike }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} handleLike={handleLike} />
    ))}
  </div>
);

export default Blogs;
