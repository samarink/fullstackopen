import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const baseurl = 'http://localhost:3001/persons';

  useEffect(() => {
    axios.get(baseurl).then(({ data }) => setPersons(data));
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

    axios.post(baseurl, newPersonObject).then((response) => {
      setPersons([...persons, response.data]);
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
