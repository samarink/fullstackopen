const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

router.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

module.exports = router;
