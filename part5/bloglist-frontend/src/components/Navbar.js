import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/users">users</Link>
    </div>
  );
};

export default Navbar;
