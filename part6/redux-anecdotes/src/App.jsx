import { useSelector, useDispatch } from 'react-redux'
import { vote as countVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(countVote(id))
  }

  const sortedAnecdotes = anecdotes.toSorted((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
