import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
  const setShowTime = () => {
    setTimeout(() => setMessage('Notification'), 3000)
  }
  const handClickLikes = async (blog) => {
    const updatedBlog = {...blog}
    updatedBlog.likes ++;
    updatedBlog.user = blog.user.id
    await blogService.update(blog.id,updatedBlog)
    const blogsRes = await blogService.getAll()
    const sortedBlogs = blogsRes.sort((a, b) => {
      return Number(b.likes) - Number(a.likes)
    })
    setBlogs(sortedBlogs)
  }
  const removeBlog = (removedBlog) => {
    setBlogs(blogs.filter(blog => JSON.stringify(blog) !== JSON.stringify(removedBlog)))
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

  const addBlog = async (blogObject) => {
    try {
      const res = await blogService.create(blogObject)
      setBlogs(blogs.concat(res))
      setMessage(`a new blog ${res.title} ${res.author} added`)
      setShowTime()
      blogFormRef.current.toggleVisibility()
    }
    catch (err) {
      setMessage(err)
      console.log(err)
    }
  }
  useEffect(() => {
    const fetchAll = async () => {
      const res = await blogService.getAll()
      const sortedBlogs = res.sort((a, b) => {
        return Number(b.likes) - Number(a.likes)
      })
      setBlogs(sortedBlogs)
    }
    fetchAll()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user') || null
    if (loggedUser !== null) {
      console.log(JSON.parse(loggedUser))
      setUser(JSON.parse(loggedUser))
      blogService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            message={message}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => {
    console.log('blogs: ', blogs)
    return (
      <div>
        <div></div>
        <h1>blogs</h1>
        <Notification message={message} />
        <div>
          {user.name} logged in
          <button onClick={handleLogOut}>log out</button>
        </div>
        <Togglable buttonLabel='new create' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} ref={blogFormRef} />
        </Togglable>
        {blogs.map(blog =>
          <>
            <Blog key={blog.id} blog={blog} handClickLikes={handClickLikes} removeBlog={removeBlog} />
          </>
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