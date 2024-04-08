import { createContext, useReducer } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_SET':
      return action.payload
    case 'USER_CLEARED':
      return null
    default:
      return state
  }
}

const userSet = (user) => ({ type: 'USER_SET', payload: user })

const userCleared = () => ({ type: 'USER_CLEARED' })

const UserContext = createContext()
export default UserContext

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  const login = async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    userDispatch(userSet(user))
    window.localStorage.setItem('blogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }

  const continueSession = () => {
    const userJson = window.localStorage.getItem('blogAppUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      userDispatch(userSet(user))
      blogService.setToken(user.token)
    }
  }

  const logout = () => {
    userDispatch(userCleared())
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
  }

  const userHelper = {
    login,
    continueSession,
    logout,
  }

  return <UserContext.Provider value={[user, userHelper]}>{children}</UserContext.Provider>
}
