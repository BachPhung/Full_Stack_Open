import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleURLChange = ({ target }) => setUrl(target.value)
  const addBlog = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    document.getElementById('focus').focus()
  }
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input id='focus'
            value={title}
            onChange={handleTitleChange}
            className='titleInput'
          />
        </div>
        <div>
          <label>author:</label>
          <input
            value={author}
            onChange={handleAuthorChange}
            className='authorInput'
          />
        </div>
        <div>
          <label>url:</label>
          <input
            value={url}
            onChange={handleURLChange}
            className='urlInput'
          />
        </div>
        <button className='create-btn' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm