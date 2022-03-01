import { Notification } from './Notification'
const LoginForm = ({ message, handleLogin, username, handlePasswordChange, password, handleUsernameChange }) => {
  return (
    <div>
      <h2>login to application</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm