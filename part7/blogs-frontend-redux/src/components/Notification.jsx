import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, error } = useSelector(({ notification }) => notification)

  const style = {
    color: `${error ? 'red' : 'green'}`,
    border: `4px solid ${error ? 'red' : 'green'}`,
    borderRadius: '4px',
    backgroundColor: 'lightgray',
    padding: '4px',
  }

  return Boolean(message) && <div style={style}>{message}</div>
}

export default Notification
