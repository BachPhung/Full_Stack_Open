const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogRoute = require('./controlers/blogs')

//Connect to database
logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    logger.info('connected to MongoDB')
}).catch(err=>{
    logger.error('error connection to MongoDB', err.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// API HERE
app.use('/',blogRoute)

//MIDDLEWARE
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app