import React, { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike }) => {
  const { title, author, url, likes, user } = blog;
  const [fullView, setFullView] = useState(false);
  const toggleFullView = () => setFullView(!fullView);

  const handleLikeSubmit = async (event) => {
    event.preventDefault();

    handleLike({ ...blog, likes: blog.likes + 1, user: user.id });
  };

  return (
    <div style={blogStyle}>
      {fullView ? (
        <div>
          <p>
            {title} {author}
          </p>
          <a href={url}>read</a>
          <p>
            {likes}
            <button onClick={handleLikeSubmit}>like</button>
          </p>
        </div>
      ) : (
        <div>
          <p>
            {title} {author}
          </p>
        </div>
      )}
      <button onClick={toggleFullView}>{fullView ? 'hide' : 'show'}</button>
    </div>
  );
};

export default Blog;
