import React, { useState, useEffect } from 'react';
import usersService from '../services/users';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  });

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
