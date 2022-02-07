const APIroute = require('express').Router()
const Person = require('../models/person')
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

APIroute.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  res.status(200).json(persons)
})

APIroute.get('/info', (req, res) => {
  const date = new Date()
  res.status(200).send(
    `<div>Phone book has info for ${data.length} people</div>
         <div>${date}</div>
        `
  )
})
APIroute.get('/api/persons/:id', async (req, res) => {
  //res.status(200).json(data.filter(d=>d.id===Number(req.params.id)))
  const person = await Person.findById(req.params.id)
  res.status(200).json(person)
})

APIroute.delete('/api/persons/:id', async (req, res) => {
  //data = data.filter(d=>d.id!==Number(req.params.id))
  const deletedPerson = await Person.findByIdAndDelete(req.params.id)
  res.status(200).json(deletedPerson)
})



APIroute.post('/api/persons', async (req, res) => {
  const reqData = req.body
  if (reqData.name === undefined || reqData.number === undefined) {
    return res.status(400).json({ err: 'name or number is missing' })
  }
  // const checkEsist = data.filter(d=>Object.values(d).includes(reqData.name))
  // if(checkEsist.length > 0) {
  //   return  res.status(403).json({err:'name must be unique'});
  // }
  const newPerson = new Person({
    name: reqData.name,
    number: reqData.number
  })
  //data = data.concat(newPerson)
  await newPerson.save()
  res.status(200).json(newPerson)
})

module.exports = APIroute