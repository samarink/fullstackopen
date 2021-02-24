const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const notificationChange = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification,
});

export default notificationReducer;
