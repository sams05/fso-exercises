import { useDispatch } from 'react-redux'
import { anecdoteCreated } from '../reducers/anecdoteReducer'
import { notificationSetTimed } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(anecdoteCreated(content))
    dispatch(notificationSetTimed(`you added "${content}"`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
