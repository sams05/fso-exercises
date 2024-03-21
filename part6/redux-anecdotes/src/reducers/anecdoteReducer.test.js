import { expect, test } from 'vitest'
import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

test("anecdote reducer doesn't mutate state", () => {
  const state = [
    {
      content: 'If it hurts, do it more often',
      id: '0',
      votes: 3,
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: '1',
      votes: 12,
    },
    {
      content: 'Premature optimization is the root of all evil.',
      id: '2',
      votes: 7,
    },
  ]
  const voteAction = {
    type: 'anecdote/anecdoteVoted',
    payload: '2',
  }
  const addAction = {
    type: 'anecdote/anecdoteAdded',
    payload: 'Test anecdote',
  }

  deepFreeze(state)
  const votedState = reducer(state, voteAction)
  const addedState = reducer(state, addAction)

  const originalAnecdote = state.find((anecdote) => anecdote.id === voteAction.payload)
  const votedAnecdote = votedState.find((anecdote) => anecdote.id === voteAction.payload)
  expect(votedAnecdote.votes).toBe(originalAnecdote.votes + 1)
  expect(addedState.length).toBe(state.length + 1)
})
