import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationSet(state, action) {
      return action.payload
    },
    notificationCleared() {
      return ''
    },
  },
})

export const { notificationSet, notificationCleared } = notificationSlice.actions
export default notificationSlice.reducer
