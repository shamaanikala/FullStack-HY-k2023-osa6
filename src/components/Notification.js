import { useNotificationDispatch, useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  

  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()
  console.log(`notification: ${notification}`)
  
  // const dispatch = useNotificationDispatch()


  //const id = notificationId
  //const dispatch = useNotificationDispatch()
  //console.log(`setNotification, id: ${id}`)
  // useNotificationDispatch('SHOW', { notification: notification, id: id })
  // notificationId++
  // setTimeout(() => console.log('setTimeout callback ei voi kutsua hookia'), 5000)
  // useNotificationDispatch('HIDE', id)


  // dispatch()

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
