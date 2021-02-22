import PropTypes from 'prop-types';
import React from 'react';

const messageStyle = {
  color: 'red',
};

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div style={messageStyle} className="error">
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
