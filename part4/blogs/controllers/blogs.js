const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

router.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
