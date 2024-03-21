import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVoted } from '../reducers/anecdoteReducer'
import { createSelector } from '@reduxjs/toolkit'

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
  const anecdotes = useSelector(
    // If state.anecdotes and state.filter remains the same (===), the selector returns the memoized result
    createSelector([(state) => state.anecdotes, (state) => state.filter], (anecdotes, filter) => {
      return anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
    })
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(anecdoteVoted(id))
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
