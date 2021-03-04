import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Logout = (props, ref) => {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(logout())}>{props.children}</button>;
};

export default React.forwardRef(Logout);
