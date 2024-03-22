import { notificationSet, notificationCleared } from '../reducers/notificationReducer'

const notifyUser = (dispatch, message, time = 5000) => {
  dispatch(notificationSet(message))
  setTimeout(() => {
    dispatch(notificationCleared())
  }, time)
}

export { notifyUser }
