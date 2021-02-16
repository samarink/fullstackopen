const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./testHelper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
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

  expect(response.body).toHaveLength(helper.blogs.length);
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

  expect(response.body).toHaveLength(helper.blogs.length + 1);
  expect(titles).toContain(newBLog.title);
});

test('if likes property missing from request it defaults to 0', async () => {
  const newBLog = {
    title: 'New Blog Title',
    author: 'me :)',
    url: 'http://example.com/',
  };

  await api.post('/api/blogs').send(newBLog);

  const response = await api.get('/api/blogs');

  const addedBlog = response.body.filter((r) => r.title === newBLog.title)[0];

  expect(addedBlog.likes).toBe(0);
});

test('if title and author properties are missing respond with 400 status code', async () => {
  const newBLog = {
    url: 'http://example.com/',
    likes: 69,
  };

  await api.post('/api/blogs').send(newBLog).expect(400);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);

  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(() => {
  mongoose.connection.close();
});
