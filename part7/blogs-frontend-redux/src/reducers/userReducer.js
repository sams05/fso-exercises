import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload
    },
    userCleared() {
      return null
    },
  },
})

const { userSet, userCleared } = userSlice.actions

export const userLoggedIn = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(userSet(user))
    window.localStorage.setItem('blogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }
}

export const userLoggedOut = () => {
  return (dispatch) => {
    dispatch(userCleared())
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
  }
}

export const userSessionContinued = () => {
  return (dispatch) => {
    const userJson = window.localStorage.getItem('blogAppUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      dispatch(userSet(user))
      blogService.setToken(user.token)
    }
  }
}

export default userSlice.reducer
