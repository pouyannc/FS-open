import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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
      setPersons(persons.concat({name: newName, number: newNumber}));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter list: <input value={filter} onChange={handleFilterInput} /></div>
      <h2>Add a new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleNameInput} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => {
        if (filter && !p.name.toLowerCase().includes(filter.toLowerCase())) return; 
        else return <div key={p.name}>{p.name} {p.number}</div>;
      })}
    </div>
  )
}

export default App
