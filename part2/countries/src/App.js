import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const urlbase = 'https://restcountries.eu/rest/v2';

  useEffect(() =>
    axios.get(`${urlbase}/all`).then(({ data }) => setCountries(data))
  );

  const handleSearchChange = (e) => setSearch(e.target.value);

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={countriesToShow} />
    </>
  );
}

export default App;
