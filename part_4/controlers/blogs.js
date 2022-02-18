const blogRoute = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogRoute.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.status(200).json(blogs)
})

blogRoute.post('/api/blogs', async (req, res, next) => {
    try {
        const token = await req.token
        const user = await req.user
        const decodedToken =await req.decodedToken
        if (!token || !decodedToken) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const blog = new Blog({
            ...req.body,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog)
    }
    catch (err) {
        next(err)
    }
})

blogRoute.delete('/api/blogs/:id', async (req, res, next) => {
    try {
        const user = await req.user
        const token = await req.token
        const decodedToken =await req.decodedToken
        if (!token || !decodedToken) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const blog = await Blog.findById(req.params.id)
        if (!blog || user._id.toString() !== blog.user.toString()) {
            return res.status(400).json({error: 'Wrong params id'})
        }
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json('Deleted the blog')
    }
    catch (err) {
        next(err)
    }
})

blogRoute.put('/api/blogs/:id', async (req, res) => {
    try {
        const response = await Blog.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = blogRoute