import { createSlice } from '@reduxjs/toolkit'

const initialState = null //'Default Notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification: (state) => null,
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (notification, duration = 5) => {
  // duration sec
  return async dispatch => {
    console.log(`setNotification, duration=${duration*1000}`)
    dispatch(showNotification(notification))
    setTimeout(() => dispatch(hideNotification()), duration*1000)
  }
}

export default notificationSlice.reducer