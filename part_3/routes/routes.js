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

APIroute.get('/info',async (req, res) => {
  const date = new Date()
   const count = await Person.countDocuments()
  res.status(200).send(
    `<div>Phone book has info for ${count} people</div>
         <div>${date}</div>
        `
  )
})
APIroute.get('/api/persons/:id', async (req, res,next) => {
  //res.status(200).json(data.filter(d=>d.id===Number(req.params.id)))
  try{
    const person = await Person.findById(req.params.id)
    if(person){
      res.status(200).json(person)
    } else{
      res.status(404).json('Not found')
    }
  }
  catch(err){
    //res.status(400).json({ error: 'malformatted id' })
    next(err)
  }
})

APIroute.put('/api/persons/:id', async (req,res, next) =>{
  try{
    const updatedPerson = {
      ...req.body
    }
    await Person.findByIdAndUpdate(req.params.id,updatedPerson)
  }
  catch(err){
    next(err)
  }
})

APIroute.delete('/api/persons/:id', async (req, res) => {
  //data = data.filter(d=>d.id!==Number(req.params.id))
  const deletedPerson = await Person.findByIdAndRemove(req.params.id)
  res.status(200).json(deletedPerson)
})



APIroute.post('/api/persons', async (req, res, next) => {
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
  try{
    await newPerson.save()
    res.status(200).json(newPerson)
  }catch(err){
    next(err)
  }
})

module.exports = APIroute