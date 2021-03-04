import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (!message) return null;

  return <Alert severity="success">{message}</Alert>;
};

export default Notification;
