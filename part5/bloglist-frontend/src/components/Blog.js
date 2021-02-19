import React, { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog: { title, author, url, likes } }) => {
  const [fullView, setFullView] = useState(false);

  const toggleFullView = () => setFullView(!fullView);

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
            <button>like</button>
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
