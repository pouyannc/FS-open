import { useState, useEffect } from 'react';
import axios from 'axios';

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
  return <div>{p.name} {p.number}</div>;
}

const Persons = ({ persons, filter }) => {
  return (
    persons.map((p) => {
      if (filter && !p.name.toLowerCase().includes(filter.toLowerCase())) return; 
      else return <Person key={p.id} p={p} />;
    })
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterInput = e => {
    setFilter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons[persons.length-1].id+1}));
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data);
      })
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
