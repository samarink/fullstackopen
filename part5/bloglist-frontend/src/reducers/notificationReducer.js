const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const notificationSet = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification,
});

export default reducer;
