import { createSlice } from '@reduxjs/toolkit'

const initialState = null //'Default Notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification: (state) => null,
  },
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer