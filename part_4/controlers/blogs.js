const blogRoute = require('express').Router()
const Blog = require('../models/blog')

blogRoute.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})

blogRoute.post('/api/blogs', async (req, res) => {
    const savedBlog = new Blog({
        ...req.body
    })
    await savedBlog.save()
    res.status(201).json(savedBlog)
})

module.exports = blogRoute