import { useState, useEffect, useContext } from 'react'
import NotificationContext from './contexts/NotificationContext'
import UserContext from './contexts/UserContext'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'

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

  if (user === null) {
    return (
      <Container>
        <Card
          raised
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            padding: '20px 10px',
            width: 300,
          }}
        >
          <CardHeader className="MuiCardHeader-title" title="log in to application" />
          <Notification />
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                size="small"
                type="text"
                margin="dense"
                label="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <TextField
                size="small"
                type="password"
                margin="dense"
                label="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </form>
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Typography component="div">{user.name} logged in </Typography>
          <Button color="inherit" onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Notification />
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        blog app
      </Typography>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  )
}

export default App
