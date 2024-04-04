const Notification = ({ message, isError = false }) => {
  const style = {
    color: `${isError ? 'red' : 'green'}`,
    border: `4px solid ${isError ? 'red' : 'green'}`,
    borderRadius: '4px',
    backgroundColor: 'lightgray',
    padding: '4px'
  }

  return Boolean(message) && <div style={style}>{message}</div>
}

export default Notification
