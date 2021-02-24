const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const notificationChange = (notification) => ({
  type: 'SET_MESSAGE',
  notification,
});

export default notificationReducer;
