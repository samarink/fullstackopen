import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const alreadyInPhonebook = (name) =>
    persons.some((person) => person.name === name);

  const addPerson = (e) => {
    if (alreadyInPhonebook(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return false;
    }

    e.preventDefault();
    const newPersonObject = {
      name: newName,
    };

    setPersons([...persons, newPersonObject]);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
