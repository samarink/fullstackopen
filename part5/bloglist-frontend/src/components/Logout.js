import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Logout = () => {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(logout())}>log out</button>;
};

export default Logout;
