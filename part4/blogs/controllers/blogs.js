const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

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
  const updatedBlog = await Blog.findOneAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.json(updatedBlog);
});

module.exports = router;
