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

const { _notificationSet, notificationCleared } = notificationSlice.actions

export const notificationSet = (message, time = 5) => {
  return (dispatch) => {
    dispatch(_notificationSet(message))
    setTimeout(() => {
      dispatch(notificationCleared())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
