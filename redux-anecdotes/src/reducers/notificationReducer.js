import { createSlice } from '@reduxjs/toolkit'

const initialState = null //'Default Notification'


// Lisätään id:t notifikaatioiden näyttämiseen, jolloin
// tuorein viesti säilyy haluaman ajan
// sovelletaan tätä vastausta:
// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    //hideNotification: (state) => null,
    hideNotification(state, action) {
      console.log(`hideNotification - id: ${action.payload}`)
      return action.payload+1 === notificationId
        ? null // viesti pois näkyvistä, jos on tuorein
        : state // muulloin pidetään viesti näkyvillä uusimmalla tilalla
    }
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

let notificationId = 0
export const setNotification = (notification, duration = 5) => {
  // duration seconds
  return async dispatch => {
    const id = notificationId
    console.log(`setNotification, id: ${id} duration=${duration*1000}`)
    dispatch(showNotification(notification, id))
    notificationId++
    setTimeout(() => dispatch(hideNotification(id)), duration*1000)
  }
}

export default notificationSlice.reducer