import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'
import axios from 'axios'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const setShowTime = () => {
    setTimeout(() => setMessage('Notification'), 3000)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('user', JSON.stringify(user))
    }
    catch (err) {
      setMessage(err.response.data.error)
      setShowTime()
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  const addBlog = async (e) => {
    e.preventDefault()
    try {
     const res = await blogService.create({title,author,url})
     console.log(res)
     setBlogs(blogs.concat(res))
     setTitle('')
     setAuthor('')
     setUrl('')
     setMessage(`a new blog ${res.title} ${res.author} added`)
     setShowTime()
     document.getElementById('focus').focus()
    }
    catch (err) {
      setMessage(err)
      console.log(err)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(async () => {
    const loggedUser = window.localStorage.getItem('user') || null
    if (loggedUser !== null) {
      console.log(JSON.parse(loggedUser));
      setUser(JSON.parse(loggedUser))
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])
  const loginForm = () => {
    return (
      <div>
        <h2>login to application</h2>
        <Notification message={message}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={message}/>
        <div>
          {user.name} logged in
          <button onClick={handleLogOut}>log out</button>
        </div>
        <h1>create new</h1>
        <form onSubmit={addBlog}>
          <div>
          <label>title:</label>
          <input id='focus'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          </div>
          <div>
          <label>author:</label>
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          </div>
          <div>
          <label>url:</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  return (
    <div>
      {user === null
        ? loginForm()
        : blogForm()
      }
    </div>
  )
}

export default App