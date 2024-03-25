import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    _notificationSet(state, action) {
      return action.payload
    },
    notificationCleared() {
      return ''
    },
  },
})

const { notificationSet, notificationCleared } = notificationSlice.actions

export const notificationSetTimed = (message, time = 5) => {
  return (dispatch) => {
    dispatch(notificationSet(message))
    setTimeout(() => {
      dispatch(notificationCleared())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
