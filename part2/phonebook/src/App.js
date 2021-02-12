import React, { useState, useEffect } from 'react';
import './index.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({});

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

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const flush = (msg, success = true) => {
    setMessage({
      msg,
      success,
    });
    setTimeout(() => setMessage({}), 5000);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (alreadyInPhonebook(newName)) {
      const message = `${newName} is already added to the phonebook, replace the old number with the new one`;

      if (window.confirm(message)) {
        const person = persons.find((p) => p.name === newName);
        updatePerson(person.id, newPersonObject);
        return;
      } else {
        return;
      }
    }

    personsService
      .create(newPersonObject)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        resetForm();
        flush(
          `${returnedPerson.name} has been secusfully added to the phonebook`
        );
      })
      .catch((err) => {
        flush(err.response.data.error, false);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!window.confirm(`delete ${person.name}?`)) return;

    personsService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      flush(`${person.name} has been successfully deleted from the phonebook`);
    });
  };

  const updatePerson = (id, newPerson) => {
    personsService
      .update(id, newPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) => (person.id === id ? updatedPerson : person))
        );
        resetForm();
        flush(`${updatedPerson.name} has been updated`);
      })
      .catch((err) => {
        resetForm();

        if (err.response.data.error) {
          flush(err.response.data.error);
        }

        flush(`${newPerson.name} has already been deleted`, false);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  return (
    <>
      <h2>Phonebook</h2>

      <Notification message={message} />

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
