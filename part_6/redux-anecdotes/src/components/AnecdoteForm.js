import { useDispatch} from 'react-redux'
import { useState } from 'react'
import { addAnecdotes } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notiReducer'
const AnecdoteForm = () => {
  const [newAnec,setNewAnec] = useState('')
  const dispatch = useDispatch()
  const createAnec = (e) =>{
    e.preventDefault()
    dispatch(addAnecdotes(newAnec))
    dispatch(setMessage(`You added new anecdote: ${newAnec}`))
    setTimeout(()=>dispatch(clearMessage()),5000)
    setNewAnec('')
    document.querySelector('.input').focus()
  }
  return (
    <div>
      <h2>create new</h2>
      <form>
        <div><input className='input' value={newAnec} onChange={e => setNewAnec(e.target.value)} /></div>
        <button onClick={createAnec}>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm