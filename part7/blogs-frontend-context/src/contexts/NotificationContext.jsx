import { createContext, useReducer } from 'react'

const initialState = {
  message: '',
  error: false,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SET':
      return action.payload
    case 'NOTIFICATION_CLEARED':
      return initialState
    default:
      return state
  }
}

const notificationSet = (message, error = false) => {
  return {
    type: 'NOTIFICATION_SET',
    payload: { message, error },
  }
}

const notificationCleared = () => ({
  type: 'NOTIFICATION_CLEARED',
})

const NotificationContext = createContext()
export default NotificationContext

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (message, error = false, time = 5000) => {
    notificationDispatch(notificationSet(message, error))
    setTimeout(() => {
      notificationDispatch(notificationCleared())
    }, time)
  }

  return (
    <NotificationContext.Provider value={[notification, showNotification]}>{children}</NotificationContext.Provider>
  )
}
