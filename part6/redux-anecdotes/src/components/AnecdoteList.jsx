import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { vote as countVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(countVote(id))
  }

  const sortedAnecdotes = anecdotes.toSorted((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
      ))}
    </div>
  )
}

export default AnecdoteList
