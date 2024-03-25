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
    anecdoteUpdated(state, action) {
      const anecdoteWithUpdate = action.payload
      const anecdoteIdx = state.findIndex((anecdote) => anecdote.id === anecdoteWithUpdate.id)
      state.splice(anecdoteIdx, 1, anecdoteWithUpdate)
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

const { anecdoteUpdated, anecdoteAppended, anecdotesSet } = anecdoteSlice.actions

export const anecdotesInitialized = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(anecdotesSet(anecdotes))
  }
}

export const anecdoteCreated = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.add(content)
    dispatch(anecdoteAppended(anecdote))
  }
}

export const anecdoteVoted = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToUpdate = anecdotes.find((anecdote) => anecdote.id === id)
    const updatedAnecdote = await anecdotesService.update({ ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 })
    dispatch(anecdoteUpdated(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
