import { useReducer, createContext, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SET':
      return action.payload
    case 'NOTIFICATION_CLEARED':
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>{children}</NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}
