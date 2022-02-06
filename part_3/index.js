const express = require('express')
const APIroute = require('./routes/routes')
const app = express()
const morgan = require('morgan')
const cors  = require('cors')
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
app.use(cors())
morgan.token('body',(req)=>{
    if(req.method ==='POST')
        return JSON.stringify(req.body)
    else
        return null
})
const PORT = process.env.PORT || 3001
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))
app.use('/',APIroute)
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})