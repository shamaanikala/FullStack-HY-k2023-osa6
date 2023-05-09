import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch, useNotificationValue } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()
  const notificationId = useNotificationValue().id

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (err) => {
      const errorMessage = err.response.data.error
      const msgId = notificationId + 1
      dispatch({ type: 'SHOW', payload: { message: `${errorMessage}`, id: msgId } })
      setTimeout(() => {
         dispatch({ type: 'HIDE', payload: msgId })
        }, 5000)
    }
  })

  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    const msgId = notificationId + 1
    dispatch({ type: 'SHOW', payload: { message: `Created a new anecdote "${content}"`, id: msgId } })
    setTimeout(() => {
       dispatch({ type: 'HIDE', payload: msgId })
      }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
