const express = require('express')
const APIroute = require('./routes/routes')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }

    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return null
})
const PORT = process.env.PORT || 3001
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))
app.use('/', APIroute)
app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})