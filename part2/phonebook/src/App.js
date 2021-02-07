import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personsService
      .getAtll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const alreadyInPhonebook = (name) =>
    persons.some((person) => person.name === name);

  const addPerson = (e) => {
    e.preventDefault();

    if (alreadyInPhonebook(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return false;
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPersonObject).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName('');
      setNewNumber('');
    });
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
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <Persons persons={persons} searchTerm={searchTerm} />
    </>
  );
};

export default App;
