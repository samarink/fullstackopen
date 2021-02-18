const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./testHelper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('when there are blogs in db', () => {
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
});

describe('adding new blog', () => {
  test('valid blog is added', async () => {
    const newBLog = {
      title: 'New Blog Title',
      author: 'me :)',
      url: 'http://example.com/',
      likes: 0,
    };

    const token = await helper.getValidToken();

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBLog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.blogs.length + 1);
    expect(titles).toContain(newBLog.title);
  });

  test('if like property is missing it defaults to 0', async () => {
    const newBLog = {
      title: 'New Blog Title',
      author: 'me :)',
      url: 'http://example.com/',
    };

    const token = await helper.getValidToken();

    await api.post('/api/blogs').set('Authorization', token).send(newBLog);

    const response = await api.get('/api/blogs');

    const addedBlog = response.body.filter((r) => r.title === newBLog.title)[0];

    expect(addedBlog.likes).toBe(0);
  });

  test('if title and author properties are missing fail with 400 status code', async () => {
    const token = await helper.getValidToken();

    const newBLog = {
      url: 'http://example.com/',
      likes: 69,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBLog)
      .expect(400);
  });

  test('if authorization token is not set fail with 401', async () => {
    const newBLog = {
      title: 'New Blog Title',
      author: 'me :)',
      url: 'http://example.com/',
    };

    await api.post('/api/blogs').send(newBLog).expect(401);
  });
});

// TODO: fix later maybe haha

// describe('deletion of a blog', () => {
//   test('succeeds for valid user', async () => {
//     const blog = helper.blogs[0];
//     const token = await helper.getValidToken();

//     await api.post('/api/blogs').set('Authorization', token).send(blog);

//     const response = await api.get('/api/blogs');

//     const addedBlog = response.body.find((r) => r.title === blog.title);

//     console.log(addedBlog, 'addedBlog');
//     await api
//       .delete(`/api/blogs/${addedBlog.id}`)
//       .set('Authorization', token)
//       .expect(204);
//   });
// });

// describe('updating a blog', () => {
//   test('succeeds for valid id', async () => {
//     const blogsAtStart = await helper.blogsInDb();
//     const blogToUpdate = blogsAtStart[0];
//     const title = 'Updated title';
//     blogToUpdate.title = title;

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send(blogToUpdate)
//       .expect(200);

//     const blogsAtEnd = await helper.blogsInDb();

//     expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

//     const titles = blogsAtEnd.map((b) => b.title);

//     expect(titles).toContain(title);
//   });
// });

afterAll(() => {
  mongoose.connection.close();
});
