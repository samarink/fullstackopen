import React from 'react';
import { useSelector } from 'react-redux';

const messageStyle = {
  color: 'red',
};

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (!message) return null;

  return (
    <div style={messageStyle} className="error">
      {message}
    </div>
  );
};

export default Notification;
