import { useState, useEffect, useContext } from 'react'
import NotificationContext from './contexts/NotificationContext'
import UserContext from './contexts/UserContext'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, showNotification] = useContext(NotificationContext)
  const [user, userHelper] = useContext(UserContext)

  useEffect(() => {
    userHelper.continueSession()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await userHelper.login({ username, password })
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response?.data?.error) {
        if (error.response.data.error === 'invalid username or password') {
          return showNotification('wrong username or password', true)
        }
        return showNotification(error.response.data.error, true)
      }
      showNotification(error.message, true)
    }
  }

  const handleLogout = () => {
    userHelper.logout()
  }

  const navbarStyle = {
    backgroundColor: 'lightgray',
    padding: 5,
  }

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
      <div style={navbarStyle}>
        <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </div>
      <Notification />
      <h2>blog app</h2>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
