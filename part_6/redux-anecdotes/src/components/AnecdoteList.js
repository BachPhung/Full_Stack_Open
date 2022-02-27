import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage2, clearMessage } from '../reducers/notiReducer'
import { vote, initializeAnecdotes, addVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initializeAnecdotes())
    },[dispatch])
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filterAnecdotes = anecdotes.length>0 ? anecdotes.filter(anecdote=>(anecdote.content.toLowerCase()).includes(filter.toLowerCase())) : []
    const voteAnecdote = (anecdote) => {
        dispatch(addVotes(anecdote))
        dispatch(setMessage2(`You voted: ${anecdote.content}`,5))
    }
    return (
        anecdotes &&
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