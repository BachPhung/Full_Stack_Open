import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, clearMessage } from '../reducers/notiReducer'
import { vote } from '../reducers/anecdoteReducer'
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filterAnecdotes = anecdotes.filter(anecdote=>(anecdote.content.toLowerCase()).includes(filter.toLowerCase()))
    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setMessage(`You voted: ${anecdote.content}`))
        setTimeout(() => dispatch(clearMessage()), 5000)
    }
    return (
        <div>
            {filterAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList