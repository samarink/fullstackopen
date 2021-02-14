const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, cur) => (max.likes > cur.likes ? max : cur);

  return blogs.reduce(reducer, {});
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
