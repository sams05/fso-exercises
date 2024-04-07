import { useState, useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

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
          title:
          <input type="text" id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input type="text" id="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type="text" id="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
