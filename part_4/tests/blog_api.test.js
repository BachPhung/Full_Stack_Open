const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Blog 1',
        author: 'Author 1',
        url: '#',
        likes: 1
    },
    {
        title: 'Blog 2',
        author: 'Author 2',
        url: '#',
        likes: 2
    }
]

beforeEach(async()=>{
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogss are returned as json', async ()=>{
    const res = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type',/application\/json/)
    expect(res.body).toHaveLength(2)
})

test('identifier property of blogs is named id',async()=>{
    const res = await api
                .get('/api/blogs')
    res.body.forEach(e => {
        expect(e.id).toBeDefined()
    })
})

test('HTTP POST request', async () =>{
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
    .expect('Content-Type',/application\/json/)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(3)
})

test('Likes property is missing', async ()=>{
    const newBlog = {
        title: 'Blog 4',
        author: 'Author 4',
        url: '#'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)
    const res = await api.get('/api/blogs')
    const blogMissingLikes = res.body.filter(blog=>blog.title==='Blog 4')
    expect(blogMissingLikes[0].likes).toBe(0)
})

test('title and url properties are missing', async()=>{
    const newBlog = {
        author: 'Author 5'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type',/application\/json/)
},10000)

afterAll(()=>{
    mongoose.connection.close()
})