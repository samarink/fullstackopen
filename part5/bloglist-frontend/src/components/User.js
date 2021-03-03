import { Link } from 'react-router-dom';
import React from 'react';

const User = ({ user }) => (
  <li>
    <Link to={`/users/${user.id}`}>{user.name}</Link> created{' '}
    {user.blogs.length} blogs
  </li>
);

export default User;
