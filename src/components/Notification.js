import { useNotificationDispatch, useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  if (true) return null

  return (
    <div style={style}>
      {}
    </div>
  )
}

export default Notification
