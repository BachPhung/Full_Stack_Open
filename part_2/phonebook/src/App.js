import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [result,setResult] = useState([])
  useEffect(()=>{
      (async() =>{
        const res = await axios.get('http://localhost:3001/persons')
        setPersons(res.data)
      })()
  },[])
  useEffect(()=>{
    const newResults = [...persons]
    setResult(newResults.filter(a=>(a.name.toLowerCase()).includes(search.toLocaleLowerCase())))
  },[search,persons])
  const handleAdd = (e) => {
    e.preventDefault()
    const nameArr = persons.map(person => person.name)
    if (nameArr.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPersons = [...persons, { 'name': newName, 'number': newNumber }]
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      document.querySelector('.input').focus()
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch}/>
      <h3>add a new</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons result={result}/>
    </div>
  )
}

export default App