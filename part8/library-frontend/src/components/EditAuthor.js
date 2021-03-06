import React, { useState, useEffect } from 'react';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';
import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-select';

const EditForm = () => {
  const result = useQuery(ALL_AUTHORS);
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors);
    }
  }, [result]);

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedOption.value, setBornTo: born } });

    setBorn('');
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
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
