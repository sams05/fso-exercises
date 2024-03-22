import { useDispatch } from 'react-redux'
import { anecdoteAppended } from '../reducers/anecdoteReducer'
import { notifyUser } from '../utils/helper'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const anecdote = await anecdotesService.add(content)
    dispatch(anecdoteAppended(anecdote))
    notifyUser(dispatch, `you added "${anecdote.content}"`, 5000)
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
