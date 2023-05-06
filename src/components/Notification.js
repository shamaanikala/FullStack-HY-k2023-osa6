import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // tämä bugaa vähän, eli jos klikkailee paljon ääniä,
  // voi viesti kadota nopeasti pois
  setTimeout(() => dispatch(hideNotification()),5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification