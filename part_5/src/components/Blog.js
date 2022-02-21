import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, handClickLikes, removeBlog }) => {
  const [show, setShow] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = { display: !show ? 'none' : '' }
  const updateLikes = async (id) => {
    try {
      const res = await blogService.update(id, {
        ...blog,
        user: blog.user.id,
        likes: likes + 1
      })
      setLikes(res.likes + 1)
      handClickLikes()
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (id, blog) => {
    const confirm = window.confirm(`remove blog ${blog.title}`)
    if (confirm) {
      try {
        await blogService.remove(id)
        removeBlog(blog)
      }
      catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)} style={{ marginLeft: '20px' }}>{show ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {likes}
          <button onClick={() =>
            updateLikes(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button onClick={() => handleDelete(blog.id, blog)} style={{ backgroundColor: 'blue', cursor: 'pointer' }}>remove</button>
        </div>
      </div>
    </div>
  )
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  borderWidth: 1,
  marginBottom: 5,
  borderTop: '1px solid black',
  width: '50%'
}
export default Blog