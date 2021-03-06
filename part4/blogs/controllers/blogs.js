const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

router.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title && !author) {
    return response.status(400).end();
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

  response.status(201).json(savedBlog);
});

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', { text: 1 });

  if (blog) {
    return response.json(blog);
  } else {
    return response.code(404).end();
  }
});

router.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (blog.user.toString() === user.id.toString()) {
    const deletedBlog = await blog.delete();

    response.status(204).json(deletedBlog);
  } else {
    response.status(401).json({ error: 'not authorized' });
  }
});

router.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.json(updatedBlog);
});

router.post('/:id/comments', async (request, response) => {
  const { text } = request.body;

  if (!text) return response.status(400).end();

  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({ text, blog: blog._id });

  const savedComment = await comment.save();

  blog.comments = [...blog.comments, savedComment._id];
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = router;
