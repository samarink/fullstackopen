import React, { useEffect } from 'react';
import Blog from './Blog';
import { useDispatch, useSelector } from 'react-redux';
import { blogsInit } from '../reducers/blogsReducer';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );

  useEffect(() => {
    dispatch(blogsInit());
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
