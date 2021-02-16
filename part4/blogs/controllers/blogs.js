const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

router.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title && !author) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

router.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndRemove(request.params.id);

  response.status(204).json(deletedBlog);
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
