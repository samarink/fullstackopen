const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogs = require('./blogs');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
});

test('blog has id property', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBLog = {
    title: 'New Blog Title',
    author: 'me :)',
    url: 'http://example.com/',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBLog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(blogs.length + 1);
  expect(titles).toContain(newBLog.title);
});

afterAll(() => {
  mongoose.connection.close();
});
