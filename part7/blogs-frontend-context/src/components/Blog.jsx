import { useContext, useState } from 'react'
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
  const [comment, setComment] = useState('')

  const handleError = (error) => {
    if (error.response?.data?.error) {
      return showNotification(error.response.data.error, true)
    }
    showNotification(error.message, true)
  }
  const handleBlogUpdate = (updatedBlog) => {
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
  }

  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    // Using wrapper function so that blogService.update retains its signature
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: handleBlogUpdate,
    onError: handleError,
  })
  const addBlogCommentMutation = useMutation({
    // Using wrapper function so that blogService.createComment retains its signature
    mutationFn: ({ id, comment }) => blogService.createComment(id, comment),
    onSuccess: handleBlogUpdate,
    onError: handleError,
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
    onError: handleError,
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
      comments,
    } = blog
    // Increase likes by 1
    updateBlogMutation.mutate({ id, updatedBlog: { title, author, url, likes: likes + 1, user, comments } })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const handleNewComment = (e) => {
    e.preventDefault()

    const { id } = blog

    addBlogCommentMutation.mutate({
      id,
      comment,
    })
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
      <div className="blog-comments">
        <h3>comments</h3>
        <form onSubmit={handleNewComment}>
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {/* Using index for the key since there delete functionality and insertion only occur at the end */}
          {blog.comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blog
