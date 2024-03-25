import { useDispatch } from 'react-redux'
import { anecdoteCreated } from '../reducers/anecdoteReducer'
import { notifyUser } from '../utils/helper'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(anecdoteCreated(content))
    notifyUser(dispatch, `you added "${content}"`, 5000)
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
