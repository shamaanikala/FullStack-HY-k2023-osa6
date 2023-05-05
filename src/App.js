import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

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
      <AnecdoteForm />
    </div>
  )
}

export default App