import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery } from 'react-query'
import { createAnecdote, getAnecdotes } from './requests'

const App = () => {
  

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 3
    }    
  )
  console.log(result)

  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  // tehtävänannon linkki:
  // https://react-query-v3.tanstack.com/guides/queries
  // ei toimi, joten otetaan tapa esimerkistä:
  // https://tanstack.com/query/v3/docs/react/overview
  // oletettavasti uusi linkki on:
  // https://tanstack.com/query/v3/docs/react/guides/queries
  // jonka mukaan result.error lienee pätevä tapa 

  if (result.error) {
    console.log(result.error.message)
    return <div>anecdote service not available due to problems in server</div>
  }
  

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
