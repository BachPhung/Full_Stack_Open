const APIroute = require('express').Router()
let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ad Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

APIroute.get('/api/persons',(req,res)=>{
    res.status(200).json(data)
})

APIroute.get('/info',(req,res)=>{
    const date = new Date()
    res.status(200).send(
        `<div>Phone book has info for ${data.length} people</div>
         <div>${date}</div>
        `
    )
})
APIroute.get('/api/persons/:id',(req,res)=>{
    res.status(200).json(data.filter(d=>d.id===Number(req.params.id)))
})

APIroute.delete('/api/persons/:id',(req,res)=>{
    data = data.filter(d=>d.id!==Number(req.params.id))
    res.status(200).json(data)
})



APIroute.post('/api/persons',(req,res)=>{
    const reqData = req.body
    if(reqData.name === undefined || reqData.number === undefined){
       return res.status(400).json({err:'name or number is missing'})
    }
    const checkEsist = data.filter(d=>Object.values(d).includes(reqData.name))
    if(checkEsist.length > 0) {
      return  res.status(403).json({err:'name must be unique'});
    }
    const newPerson = {
        id: Math.random() * 1000000,
        name: reqData.name,
        number: reqData.number
    }
    data = data.concat(newPerson)
    res.status(200).json(data)
})

module.exports = APIroute