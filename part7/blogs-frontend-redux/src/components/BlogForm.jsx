import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlogSaved } from '../reducers/blogsReducer'
import { notificationSetTimed } from '../reducers/notificationReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await dispatch(newBlogSaved({ title, author, url }))
      dispatch(notificationSetTimed(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      if (error.response?.data?.error) {
        return dispatch(notificationSetTimed(error.response.data.error, true))
      }
      dispatch(notificationSetTimed(error.message, true))
    }
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()

    await createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
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
