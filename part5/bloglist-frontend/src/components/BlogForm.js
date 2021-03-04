import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { blogAdd } from '../reducers/blogsReducer';
import { notificationSet } from '../reducers/notificationReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

const BlogForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(blogAdd({ title, author, url, user: user.id }));

    dispatch(notificationSet(`${title} has been added`));
    setTimeout(() => {
      dispatch(notificationSet(null));
    }, 5000);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const classes = useStyles();
  return (
    <>
      <h2>Create new</h2>
      <form id="formDiv" onSubmit={handleSubmit} className={classes.root}>
        <div>
          <TextField
            label="title"
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button color="primary" type="submit">
          add blog
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
