import React, { useState } from 'react';
import { EDIT_AUTHOR } from '../queries';
import { useMutation } from '@apollo/client';

const EditForm = () => {
  const [name, setName] = useState([]);
  const [born, setBorn] = useState('');
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: born } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default EditForm;
