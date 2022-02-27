import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdotes(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const index = state.findIndex(obj => obj.id === action.payload)
      state[index].votes++
      return state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdotes, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const res = await anecdoteService.getAll()
    res.sort((a,b)=>b.votes-a.votes)
    dispatch(setAnecdotes(res))
  }
}
export const addAnec = (content) => {
  return async dispatch =>{
    const newAnecdote = {
      content,
      votes: 0
    }
    const res = await anecdoteService.create(newAnecdote)
    dispatch(addAnecdotes(res))
  }
}
export const addVotes = (oldAnecdote) =>{
  return async dispatch =>{
    const updatedAnecdote = {
      ...oldAnecdote,
      votes: oldAnecdote.votes + 1
    }
    await anecdoteService.update(oldAnecdote.id, updatedAnecdote)
    dispatch(vote(oldAnecdote.id))
  }
}

export default anecdoteSlice.reducer