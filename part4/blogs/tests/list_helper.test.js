const listHelper = require('../utils/list_helper');
const blogs = require('./blogs');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals likes of that', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });

  test('of a bigger list calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test('when list has only one blog equals that blog', () => {
    const singleBlogList = [blogs[0]];

    expect(listHelper.favoriteBlog(singleBlogList)).toEqual(...singleBlogList);
  });

  test('finds the right blog in a bigger list', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('most blogs', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null);
  });

  test('when list has only one blog equals that blog author and blogs count is 1', () => {
    const singleBlogList = [blogs[0]];
    const expected = { author: 'Michael Chan', blogs: 1 };

    expect(listHelper.mostBlogs(singleBlogList)).toEqual(expected);
  });

  test('finds the right blog in a bigger list', () => {
    const expected = { author: 'Robert C. Martin', blogs: 3 };

    expect(listHelper.mostBlogs(blogs)).toEqual(expected);
  });
});

describe('most likes', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostLikes([])).toEqual(null);
  });

  test('when list has only one blog equals that blog author and likes', () => {
    const singleBlogList = [blogs[0]];
    const expected = { author: 'Michael Chan', likes: 7 };

    expect(listHelper.mostLikes(singleBlogList)).toEqual(expected);
  });

  test('finds the right blog in a bigger list', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 };

    expect(listHelper.mostLikes(blogs)).toEqual(expected);
  });
});
