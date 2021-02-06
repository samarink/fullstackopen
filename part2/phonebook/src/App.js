import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
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
    <>
      <h2>Phonebook</h2>

      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <Persons persons={persons} searchTerm={searchTerm} />
    </>
  );
};

export default App;
