import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    anecdoteVoted(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id)
      anecdoteToUpdate.votes++
      return state
    },
    anecdoteAppended(state, action) {
      state.push(action.payload)
    },
    anecdotesSet(state, action) {
      return action.payload
    },
  },
})

export const { anecdoteVoted, anecdoteAppended, anecdotesSet } = anecdoteSlice.actions

export const anecdotesInitialized = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(anecdotesSet(anecdotes))
  }
}

export default anecdoteSlice.reducer
