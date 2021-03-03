import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usersService from '../services/users';

const UserView = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    usersService.getById(id).then((user) => setUser(user));
  }, [id]);

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
