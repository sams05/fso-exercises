import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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
      <TableContainer component={Paper} elevation={6}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
