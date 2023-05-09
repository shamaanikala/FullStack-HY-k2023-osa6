import { useNotificationValue } from '../NotificationContext'

// let notificationId = 0

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue().message
  console.log(`notification: ${notification}`)

  // if (true) return null
  if (notification === null) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
