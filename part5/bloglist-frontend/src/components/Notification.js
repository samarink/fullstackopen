import PropTypes from 'prop-types';
import React from 'react';

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <>
      <p>{message}</p>
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
