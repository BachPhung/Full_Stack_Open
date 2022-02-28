import ConnectedAnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import ConnectedNoti from "./components/Notification"
import ConnectedFilter from "./components/Filter"
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNoti/>
      <ConnectedFilter/>
      <AnecdoteList/>
      <ConnectedAnecdoteForm/>
    </div>
  )
}

export default App