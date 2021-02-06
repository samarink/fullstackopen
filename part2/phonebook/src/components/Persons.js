import Person from './Person';

const Persons = ({ persons, searchTerm }) => (
  <>
    <h2>Numbers</h2>
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchTerm))
        .map(({ name, number }) => (
          <Person key={name} name={name} number={number} />
        ))}
    </ul>
  </>
);

export default Persons;
