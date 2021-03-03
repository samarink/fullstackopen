import React from 'react';

const User = ({ user }) => (
  <li>
    {user.username} created {user.blogs.length} blogs
  </li>
);

export default User;
