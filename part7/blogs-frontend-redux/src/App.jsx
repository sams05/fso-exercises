import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSetTimed } from './reducers/notificationReducer'
import { blogsInitialized } from './reducers/blogsReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)

  useEffect(() => {
    dispatch(blogsInitialized())
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('blogAppUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response?.data?.error) {
        if (error.response.data.error === 'invalid username or password') {
          return dispatch(notificationSetTimed('wrong username or password', true))
        }
        return dispatch(notificationSetTimed(error.response.data.error, true))
      }
      dispatch(notificationSetTimed(error.message, true))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUser')
    blogService.setToken(null)
  }

  const main = () => {
    if (user === null) {
      return (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <form data-testid="login-form" onSubmit={handleLogin}>
            <div>
              username
              <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              password
              <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <Togglable ref={blogFormRef} buttonLabel="create new blog">
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        {blogs
          .toSorted((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog key={blog.id} loggedInUser={user} blog={blog} />
          ))}
      </div>
    )
  }

  return <div>{main()}</div>
}

export default App
