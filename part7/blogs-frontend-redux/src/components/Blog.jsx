import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { blogUpdateSaved, blogDeleteSaved } from '../reducers/blogsReducer'
import { notificationSetTimed } from '../reducers/notificationReducer'

const Blog = ({ loggedInUser, blog }) => {
  const dispatch = useDispatch()
  const [detailVisible, setDetailVisible] = useState(false)

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

  const updateBlog = async (id, updatedBlog) => {
    try {
      await dispatch(blogUpdateSaved(id, updatedBlog))
    } catch (error) {
      if (error.response?.data?.error) {
        dispatch(notificationSetTimed(error.response.data.error, true))
        return
      }
      dispatch(notificationSetTimed(error.message, true))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await dispatch(blogDeleteSaved(id))
    } catch (error) {
      if (error.response?.data?.error) {
        dispatch(notificationSetTimed(error.response.data.error, true))
        return
      }
      dispatch(notificationSetTimed(error.message, true))
    }
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
    updateBlog(id, { title, author, url, likes: likes + 1, user })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
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
  loggedInUser: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog
