import { useRef } from 'react'
import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

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

  return (
    <>
      <Togglable ref={blogFormRef} buttonLabel="create new blog">
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs
        .toSorted((blog1, blog2) => blog2.likes - blog1.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default Blogs
