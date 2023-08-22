import { useState, useEffect } from 'react';
import personService from './services/persons'

const Filter = ({ filter, handleChange }) => {
  return (
    <div>filter list: <input value={filter} onChange={handleChange} /></div>
  )
}

const Form = ({ handleSubmit, newName, newNumber, handleName, handleNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleName} /></div>
      <div>number: <input value={newNumber} onChange={handleNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ p }) => {
  return <span>{p.name} {p.number} </span>;
}

const Persons = ({ persons, filter, handleClick }) => {
  return (
    persons.map((p) => {
      if (filter && !p.name.toLowerCase().includes(filter.toLowerCase())) return; 
      else return (
        <div key={p.id}>
          <Person p={p}></Person>
          <button onClick={() => handleClick(p.id)}>delete</button>
        </div>
      )
    })
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameInput = e => {
    setNewName(e.target.value);
  }

  const handleNumberInput = e => {
    setNewNumber(e.target.value);
  }

  const handleFilterInput = e => {
    setFilter(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const existingPerson = persons.find((x) => x.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook. Replace info?`)) {
        const updateEntry = {...existingPerson, number: newNumber}
        personService.update(existingPerson.id, updateEntry)
        setPersons(persons.map(p => p.id === existingPerson.id ? updateEntry : p))
      }
    } else {
      const newEntry = {name: newName, number: newNumber}
      personService.create(newEntry).then(entry => {
        console.log(entry);
        setPersons([...persons, entry]);
      })
    }
  }

  const handleDelete = id => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService.del(id)
      setPersons(persons.filter(p => p.id !== id))
    } 
  }

  useEffect(() => {
    personService.getAll().then(data => setPersons(data));
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterInput} />
      <h2>Add a new entry</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleName={handleNameInput}
        handleNumber={handleNumberInput}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleClick={handleDelete} />
    </div>
  )
}

export default App
