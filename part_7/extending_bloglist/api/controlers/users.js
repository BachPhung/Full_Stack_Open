const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if (username.length < 3 || password.length < 3) {
        return res.status(401).json(
            { error: 'Name or Password must be at least 3 chars long' }
        )
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })
    try {
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    }
    catch (err) {
        res.status(400).json({
            error: 'username must be unique'
        })
    }
})

userRouter.get('/', async (req,res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

module.exports = userRouter