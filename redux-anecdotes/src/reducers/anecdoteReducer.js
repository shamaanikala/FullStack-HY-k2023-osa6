import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      const updatedAnecdote = action.payload
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.get(id)
    const votedAnecdoteObject = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const votedAnecdote = await anecdoteService.update(id,votedAnecdoteObject)
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer