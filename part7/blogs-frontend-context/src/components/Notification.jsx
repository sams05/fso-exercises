import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const [{ message, error }] = useContext(NotificationContext)

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
