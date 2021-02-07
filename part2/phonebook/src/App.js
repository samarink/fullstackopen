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

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (alreadyInPhonebook(newName)) {
      const message = `${newName} is already added to the phonebook, replace the old number with the new one`;
      if (window.confirm(message)) {
        const id = persons.find((p) => p.name === newName).id;
        updatePerson(id, newPersonObject);
        return;
      } else {
        return;
      }
    }

    personsService.create(newPersonObject).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName('');
      setNewNumber('');
    });
  };

  const deletePerson = (id) => {
    const personName = persons.find((p) => p.id === id).name;
    if (!window.confirm(`delete ${personName}?`)) return;

    personsService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const updatePerson = (id, newPerson) => {
    personsService.update(id, newPerson).then((updatedPerson) => {
      setPersons(
        persons.map((person) => (person.id === id ? updatedPerson : person))
      );
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

      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={deletePerson}
      />
    </>
  );
};

export default App;
