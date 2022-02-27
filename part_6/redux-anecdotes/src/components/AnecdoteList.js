import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, clearMessage } from '../reducers/notiReducer'
import { vote, setAnecdotes } from '../reducers/anecdoteReducer'
import anecdotesService from '../services/anecdotes'
const AnecdoteList = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAnecdotes = async () =>{
            const res = await anecdotesService.getAll()
            dispatch(setAnecdotes(res))
        }
        fetchAnecdotes()
    },[dispatch])
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filterAnecdotes = anecdotes.length>0 ? anecdotes.filter(anecdote=>(anecdote.content.toLowerCase()).includes(filter.toLowerCase())) : []
    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setMessage(`You voted: ${anecdote.content}`))
        setTimeout(() => dispatch(clearMessage()), 5000)
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