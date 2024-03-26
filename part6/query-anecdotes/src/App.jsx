import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({type: 'NOTIFICATION_SET', payload: `anecdote "${anecdote.content}" voted`})
    setTimeout(() => {
      notificationDispatch({type: 'NOTIFICATION_CLEARED'})
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
