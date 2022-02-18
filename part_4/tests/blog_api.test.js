const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const helper = require('../utils/test_helper')
const api = supertest(app)
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { use } = require('../controlers/blogs')
beforeEach(async () => {
    const saltRounds = 10
    await Blog.deleteMany({})
    await User.deleteMany({})
    const user = new User({
        username:'root',
        passwordHash:await bcrypt.hash('hello',saltRounds),
        name:'Root User'
    })
    const savedUser = await user.save()
    token = jwt.sign({username: user.username, id: savedUser.id}, config.SECRET)
    const initialBlogs = (helper.initialBlogs).map((blog)=> {return ({...blog, user:savedUser.id})})
    await Blog.insertMany(initialBlogs)
})

test('blogss are returned as json', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier property of blogs is named id', async () => {
    const res = await api
        .get('/api/blogs')
    res.body.forEach(e => {
        expect(e.id).toBeDefined()
    })
})

test('HTTP POST request', async () => {
    const newBlog = {
        title: 'Blog 3',
        author: 'Author 3',
        url: '#',
        likes: 3
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .set('authorization', `Bearer ${token}`)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(3)
})

test('HTTP POST request with non token provided', async ()=>{
    const newBlog = {
        title: 'Blog 3',
        author: 'Author 3',
        url: '#',
        likes: 3
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    const BlogsAtEnd = await api.get('/api/blogs')
    expect(BlogsAtEnd.body).toHaveLength(helper.initialBlogs.length)
})

test('Likes property is missing', async () => {
    const newBlog = {
        title: 'Blog 4',
        author: 'Author 4',
        url: '#'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs')
    const blogMissingLikes = res.body.filter(blog => blog.title === 'Blog 4')
    expect(blogMissingLikes[0].likes).toBe(0)
})

test('title and url properties are missing', async () => {
    const newBlog = {
        author: 'Author 5'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /application\/json/)
})

test('delete a single blog', async () => {
    const blogs = await Blog.find({})  //get all the blogs
    const firstBlog = blogs[0]
    await api.delete(`/api/blogs/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .set('authorization', `Bearer ${token}`)
    const blogsAfterDelete = await Blog.find({})
    expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length - 1)
})

test('update infomation for a blog', async () => {
    const blogs = await Blog.find({})
    const firstBlog = blogs[0]
    const newBlogs = {
        title: 'Blog 1 Updated',
        likes: 10
    }
    await api.put(`/api/blogs/${firstBlog.id}`)
             .send(newBlogs)
             .expect(200)
            .set('authorization', `Bearer ${token}`)
             .expect('Content-Type', /application\/json/)
    const updatedBlog = await Blog.find({'title': 'Blog 1 Updated'})
    expect(updatedBlog[0].likes).toBe(10)
    expect(updatedBlog[0].title).toBe('Blog 1 Updated')        
})


afterAll(() => {
    mongoose.connection.close()
})