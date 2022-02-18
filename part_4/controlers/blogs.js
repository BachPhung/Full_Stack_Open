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
    try{
        await savedBlog.save()
        res.status(201).json(savedBlog)
    }
    catch(err){
        res.status(400).json(err)
    }
})

blogRoute.delete('/api/blogs/:id', async(req,res)=>{
    try{
       await Blog.findByIdAndDelete(req.params.id)
       res.status(200).json('Deleted the blog')
    }
    catch(err){
        res.status(400).json('Fail to delete')
    }
})

blogRoute.put('/api/blogs/:id',async(req,res)=>{
    try{
        const response = await Blog.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json(response)
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = blogRoute