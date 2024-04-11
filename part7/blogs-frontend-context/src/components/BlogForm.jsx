import { useState, useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [, showNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        return showNotification(error.response.data.error, true)
      }
      showNotification(error.message, true)
    },
  })

  const handleNewBlog = async (e) => {
    e.preventDefault()

    newBlogMutation.mutate({ title, author, url })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField
            id="title"
            size="small"
            type="text"
            margin="dense"
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id="author"
            size="small"
            type="text"
            margin="dense"
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id="url"
            size="small"
            type="text"
            margin="dense"
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" size="small" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
