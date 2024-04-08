import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const Users = () => {
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (usersResult.isLoading) {
    return <div>Loading data...</div>
  }

  const users = usersResult.data

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
