import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      console.log(`'SHOW', action.payload:`,action.payload, 'state: ', state)
      const message = action.payload.message
      const id = action.payload.id
      return { message, id: id }
    case "HIDE":
      console.log(`'HIDE', action.payload:`,action.payload, 'state: ', state)
      return action.payload === state.id
        ? { ...state, message: null }
        : state
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
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null, id: 0 })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext