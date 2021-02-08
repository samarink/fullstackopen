const Notification = ({ message: {msg, success} }) => {
  if (!msg) return null;

  const result = success ? 'success' : 'error';
  const classes = `notification ${result}`

  return (
    <div className={classes}>
      {msg}
    </div>
  )
}

export default Notification;
