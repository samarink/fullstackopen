import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Button
                    style={{ textTransform: 'none' }}
                    color="primary"
                    component={Link}
                    to={`/blogs/${blog.id}`}
                  >
                    {blog.title}
                  </Button>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
