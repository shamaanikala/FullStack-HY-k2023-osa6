import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Default Notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer