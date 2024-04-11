import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const [{ message, error }] = useContext(NotificationContext)

  return Boolean(message) && <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
}

export default Notification
