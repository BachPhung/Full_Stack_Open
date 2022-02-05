const express = require('express')
const APIroute = require('./routes/routes')
const app = express()
var morgan = require('morgan')
app.use(express.json())

morgan.token('body',(req)=>{
    if(req.method ==='POST')
        return JSON.stringify(req.body)
    else
        return null
})
const PORT = 3001
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))
app.use('/',APIroute)
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})