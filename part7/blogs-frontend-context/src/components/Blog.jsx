import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id

  const blogResult = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getOne(id),
  })

  const [, showNotification] = useContext(NotificationContext)
  const [loggedInUser] = useContext(UserContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    // Using wrapper function so that blogService.update retains its signature
    mutationFn: async ({ id, updatedBlog }) => await blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      // Update data for array of blogs rendered on the view for list of blogs
      const blogs = queryClient.getQueryData(['blogs'])
      // Replace the updated blog on the blogs array
      if (blogs) {
        queryClient.setQueryData(
          ['blogs'],
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
        )
      }

      // Update data for individual blog
      queryClient.invalidateQueries({ queryKey: ['blog', updatedBlog.id] })
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
      // Update data for array of blogs rendered on the view for list of blogs
      const blogs = queryClient.getQueryData(['blogs'])
      // On successful removal, keep every blog that doesn't match the deleted one
      if (blogs) {
        queryClient.setQueryData(
          ['blogs'],
          blogs.filter((blog) => blog.id !== id),
        )
      }

      // Update data for individual blog
      queryClient.removeQueries({ queryKey: ['blog', id], exact: true })

      navigate('/')
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        return showNotification(error.response.data.error, true)
      }
      showNotification(error.message, true)
    },
  })

  if (blogResult.isLoading) {
    return <div>Loading data...</div>
  }

  if (blogResult.isError) {
    return <div>Failed to load data</div>
  }

  const blog = blogResult.data

  const pStyle = {
    marginBlock: 2,
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
    <>
      <h2 className="blog-heading">
        {blog.title} {blog.author}
      </h2>
      <div className="blog-details">
        <a style={pStyle} href={blog.url}>
          {blog.url}
        </a>
        <p style={pStyle}>
          likes {blog.likes} <button onClick={incrementLikes}>like</button>
        </p>
        <p style={pStyle}>added by {blog.user.name}</p>
        {loggedInUser.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
      </div>
    </>
  )
}

export default Blog
