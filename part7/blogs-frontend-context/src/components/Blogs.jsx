import { useRef } from 'react'
import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogFormRef = useRef()

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (blogsResult.isLoading) {
    return <div>Loading data...</div>
  }

  const blogs = blogsResult.data

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      <Togglable ref={blogFormRef} buttonLabel="create new blog">
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs
        .toSorted((blog1, blog2) => blog2.likes - blog1.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </>
  )
}

export default Blogs
