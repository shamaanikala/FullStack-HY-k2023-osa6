import { useDispatch, useSelector } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, voteAction }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={voteAction}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  // järjestetään lista täällä, koska reducer ei tunnu oikealta paikalta
  // ja kuten materiaalissa tehtiin importantNotes selektroissa
  // myös SO ketju tukee tätä:
  // https://stackoverflow.com/questions/34475367/where-should-i-handle-sorting-in-redux-app
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes
        .filter(a => a.content.includes(state.filter))
        .sort((a, b) => b.votes - a.votes)
    }
    else {
      return state.anecdotes.sort((a, b) => b.votes - a.votes)
    }
    
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(votedAnecdote(id))
  }


  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          voteAction={() => vote(anecdote.id)}
        />
      )}
    </>
  )
}

export default AnecdoteList