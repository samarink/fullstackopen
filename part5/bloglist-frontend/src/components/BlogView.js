import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
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
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">{author}</Typography>
          <Button color="primary" component={Link} to={url}>
            {url}
          </Button>
          <div>
            {likes} likes{' '}
            <Button
              color="primary"
              variant="outlined"
              onClick={() => dispatch(blogLike(blog))}
            >
              like
            </Button>
          </div>
          <p>added by {blog.user.name}</p>
        </CardContent>
        <CardActions>
          {createdByCurrentUser() && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(blogDelete(blog));
                history.push('/');
              }}
            >
              delete
            </Button>
          )}
        </CardActions>
      </Card>
      <form onSubmit={handleSubmit}>
        <h2>add a comment</h2>
        <div>
          <TextField
            id="text"
            label="text"
            type="text"
            value={text}
            name="Text"
            onChange={({ target }) => setText(target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          id="loginButton"
          type="submit"
        >
          submit
        </Button>
      </form>
      <h2>comments</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogView;
