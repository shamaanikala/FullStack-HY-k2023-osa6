import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



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
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    //console.log('AnecdoteList: ',typeof(anecdotes),anecdotes)
    // anecdotes on nyt object, joka lienee slicen syytä
    // muutetaan oikeaksi taulukoksi
    const anecdotesList = [...anecdotes]
    if (filter) {
      return anecdotesList
        .filter(a => a.content.includes(filter))
        .sort((a, b) => b.votes - a.votes)
    }
    else {
      return anecdotesList.sort((a, b) => b.votes - a.votes)
    }
    
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const votedContent = anecdotes.find(a => a.id === id).content
    dispatch(setNotification(`you voted '${votedContent}'`,10))
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