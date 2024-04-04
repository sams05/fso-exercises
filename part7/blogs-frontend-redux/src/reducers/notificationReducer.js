import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  error: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet(state, action) {
      const { message, error = false } = action.payload
      return {
        message,
        error,
      }
    },
    notificationCleared() {
      return initialState
    },
  },
})

const { notificationSet, notificationCleared } = notificationSlice.actions

export const notificationSetTimed = (message, error, time = 5000) => {
  return (dispatch) => {
    dispatch(notificationSet({ message, error }))
    setTimeout(() => {
      dispatch(notificationCleared())
    }, time)
  }
}

export default notificationSlice.reducer
