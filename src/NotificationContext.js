import { createContext, useReducer, useContext } from 'react'

let notificationId = 0

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "HIDE":
      return action.payload + 1 === notificationId
        ? null // on tuorein, joten pois näkyvistä
        : state // pidetään tuorein viesti näkyvissä
    default:
      return state
  }
}

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
  const [notification, notificationDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext