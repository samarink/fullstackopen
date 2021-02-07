import Person from './Person';

const Persons = ({ persons, searchTerm, handleDelete }) => (
  <>
    <h2>Numbers</h2>
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchTerm))
        .map(({ name, number, id }) => (
          <Person
            key={name}
            name={name}
            number={number}
            handleDelete={handleDelete}
            id={id}
          />
        ))}
    </ul>
  </>
);

export default Persons;
