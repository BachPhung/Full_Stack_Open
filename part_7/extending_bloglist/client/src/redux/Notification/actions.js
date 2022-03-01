const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    payload: message
  }
}

const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}



export default { setMessage, clearMessage }