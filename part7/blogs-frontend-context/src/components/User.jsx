import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id

  const userResult = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getOne(id),
  })

  if (userResult.isLoading) {
    return <div>Loading data...</div>
  }

  const user = userResult.data

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
