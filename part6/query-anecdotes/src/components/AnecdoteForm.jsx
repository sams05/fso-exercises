import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (data, content) => {
      queryClient.invalidateQueries(['anecdotes'])
      notificationDispatch({ type: 'NOTIFICATION_SET', payload: `anecdote "${content}" added` })
      setTimeout(() => {
        notificationDispatch({ type: 'NOTIFICATION_CLEARED' })
      }, 5000)
    },
    onError: (err) => {
      console.log(err)
      notificationDispatch({ type: 'NOTIFICATION_SET', payload: err.response.data.error})
      setTimeout(() => {
        notificationDispatch({ type: 'NOTIFICATION_CLEARED' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
