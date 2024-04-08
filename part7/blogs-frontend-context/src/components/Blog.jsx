import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const [, showNotification] = useContext(NotificationContext)
  const [loggedInUser] = useContext(UserContext)
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    // Using wrapper function so that blogService.update retains its signature
    mutationFn: async ({ id, updatedBlog }) => await blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      // Replace the updated blog on the blogs array
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      )
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        return showNotification(error.response.data.error, true)
      }
      showNotification(error.message, true)
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (result, id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      // On successful removal, keep every blog that doesn't match the deleted one
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== id),
      )
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        return showNotification(error.response.data.error, true)
      }
      showNotification(error.message, true)
    },
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const pStyle = {
    marginBlock: 2,
  }

  const showWhenVisible = {
    display: detailVisible ? '' : 'none',
  }

  const incrementLikes = () => {
    const {
      id,
      title,
      author,
      url,
      likes,
      user: { id: user },
    } = blog
    // Increase likes by 1
    updateBlogMutation.mutate({ id, updatedBlog: { title, author, url, likes: likes + 1, user } })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div style={blogStyle} data-testid="blog">
      <div className="blog-heading">
        {blog.title} {blog.author}
        <button onClick={() => setDetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className="blog-details">
        <p style={pStyle}>{blog.url}</p>
        <p style={pStyle}>
          likes {blog.likes} <button onClick={incrementLikes}>like</button>
        </p>
        <p style={pStyle}>{blog.user.name}</p>
        {loggedInUser.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
