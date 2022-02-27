import { useSelector } from "react-redux"
const Notification = () => {
  const message = useSelector(state=>state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    message.length > 0 &&
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification