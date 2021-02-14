const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  const reducer = (max, cur) => (max.likes > cur.likes ? max : cur);

  return blogs.reduce(reducer, {});
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;

  const count = {};

  blogs.forEach(({ author }) => (count[author] = count[author] + 1 || 1));

  const author = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  return { author, blogs: count[author] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;

  const count = {};

  blogs.forEach(
    ({ author, likes }) => (count[author] = count[author] + likes || likes)
  );

  const author = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  return { author, likes: count[author] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
