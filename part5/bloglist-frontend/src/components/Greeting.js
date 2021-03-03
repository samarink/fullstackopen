import React from 'react';
import { useSelector } from 'react-redux';

const Greeting = () => {
  const user = useSelector((state) => state.user);

  return (
    <>{user ? <p>{user.username} is logged in</p> : <p>please log in</p>}</>
  );
};

export default Greeting;
