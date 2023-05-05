import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, votedAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  // järjestetään lista täällä, koska reducer ei tunnu oikealta paikalta
  // ja kuten materiaalissa tehtiin importantNotes selektroissa
  // myös SO ketju tukee tätä:
  // https://stackoverflow.com/questions/34475367/where-should-i-handle-sorting-in-redux-app
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(votedAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(anecdote)
    dispatch(createAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App