const Person = ({ id, name, number, handleDelete }) => (
  <li>
    {name} {number}
    <button onClick={() => handleDelete(id)}>delete</button>
  </li>
);

export default Person;
