import React from 'react';
import Greeting from './Greeting';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const navbarStyle = {
  padding: 10,
  background: 'lightgray',
  display: 'flex',
  alignItems: 'center'
};
const padding = { padding: 5 };

const Navbar = () => {
  return (
    <div style={navbarStyle}>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <Greeting />
      <Logout />
    </div>
  );
};

export default Navbar;
