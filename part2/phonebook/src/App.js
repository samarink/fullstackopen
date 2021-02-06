import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameChange = (e) => setNewName(e.target.value);

  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

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
      phone: newPhone,
    };

    setPersons([...persons, newPersonObject]);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search: <input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) => person.name.toLowerCase().includes(searchTerm))
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.phone}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
