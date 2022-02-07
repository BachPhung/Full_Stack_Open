import React, { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import phoneService from './services/phone_Number'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])
  const [message, setMessage] = useState('Notification')
  const setShowTime = () => {
    setTimeout(() => setMessage('Notification'), 3000)
  }
  useEffect(() => {
    (async () => {
      const initialNumbers = await phoneService.getAll()
      setPersons(initialNumbers)
    })()
  }, [])
  useEffect(() => {
    const newResults = [...persons]
    setResult(newResults.filter(a => (a.name.toLowerCase()).includes(search.toLocaleLowerCase())))
  }, [search, persons])

  const handleAdd = (e) => {
    e.preventDefault()
    const nameArr = persons.map(person => person.name.toLowerCase())
    if (nameArr.includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const targetPerson = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())
        targetPerson[0].number = newNumber
        const personObj = targetPerson[0]
        phoneService.update(targetPerson[0].id, personObj)
        const newA = [...persons]
        const objIndex = newA.findIndex((obj => obj.name.toLowerCase() === newName.toLowerCase()))
        newA[objIndex].number = newNumber
        setMessage(`Number of ${personObj.name} is changed into ${personObj.number}`)
        setNewName('')
        setNewNumber('')
        document.querySelector('.input').focus()
        setPersons(newA)
        setShowTime()
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
        phoneService.create(newPerson).then((returnedPerson) => {
          setMessage(`added ${newPerson.name}`)
          setShowTime()
          setPersons(persons.concat(returnedPerson))
        })
      .catch ((err)=>{
        setMessage(err.response.data.error)
        setShowTime()
      }) 
      setNewName('')
      setNewNumber('')
      document.querySelector('.input').focus()
    }
  }
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.filter(p => p.id === id)[0].name}?`)) {
      phoneService.deletePerson(id).then(() => {
        console.log(id)
        const newArr = persons.filter(p => p.id !== id)
        setPersons(newArr)
        setMessage(`${persons.filter(p => p.id === id)[0].name} is deleted`)
        setShowTime()
      }).catch(() => {
        setMessage(`Information of ${persons.filter(p => p.id === id)[0].name} has already been removed from server`)
        setShowTime()
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} setSearch={setSearch} />
      <h3>add a new</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons result={result} handleDelete={handleDelete} />
    </div>
  )
}

export default App