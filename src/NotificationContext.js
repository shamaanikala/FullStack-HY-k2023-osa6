import { createContext, useReducer, useContext } from 'react'

// let notificationId = 0

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      console.log('SHOW', action.payload)
      return action.payload
    case "HIDE":
      return null
      // return action.payload + 1 === notificationId
      //   ? null // on tuorein, joten pois näkyvistä
      //   : state // pidetään tuorein viesti näkyvissä
    default:
      return state
  }
}

// export const useNotification = (notification) => {
//   const dispatch = useNotificationDispatch()
//   const id = notificationId
//   dispatch({ type: 'SHOW', payload: notification })
//   notificationId++
//   setTimeout(() => dispatch({ type: 'HIDE', payload: id}), 5000)
// }

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default NotificationContext