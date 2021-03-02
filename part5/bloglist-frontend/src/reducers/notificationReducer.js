const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.notification;
    default:
      return state;
  }
};

export const notificationSet = (notification) => ({
  type: 'SET',
  notification,
});

export default reducer;
