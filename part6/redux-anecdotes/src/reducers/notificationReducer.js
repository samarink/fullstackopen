const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const notificationFlush = (notification, timeout) => async (
  dispatch
) => {
  dispatch(notificationChange(notification));
  setTimeout(() => dispatch(notificationChange(null)), timeout * 1000);
};

const notificationChange = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification,
});

export default notificationReducer;
