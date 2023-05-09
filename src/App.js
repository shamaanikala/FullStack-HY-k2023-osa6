import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'

const App = () => {
  
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()
  const notificationId = useNotificationValue().id

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    const voteId = notificationId + 1
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SHOW', payload: { message: `anecdote '${anecdote.content}' voted`, id: voteId } })
    setTimeout(() => {
       dispatch({ type: 'HIDE', payload: voteId })
      }, 5000)
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
    
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
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
