import { connect } from 'react-redux'
import { useState } from 'react'
import { addAnec } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notiReducer'
const AnecdoteForm = (props) => {
  const [newAnec, setNewAnec] = useState('')
  const createAnec = async (e) => {
    clearTimeout()
    e.preventDefault()
    props.addAnec(newAnec)
    props.setMessage(`You added new anecdote: ${newAnec}`)
    setTimeout(() => props.clearMessage(), 5000)
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

const mapStateToProps = (state) =>{
  return {
    state: state
  }
}
const mapDispatchToProps = {
  addAnec,
  setMessage,
  clearMessage
}
const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm