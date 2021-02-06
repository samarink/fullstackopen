import React, { useState } from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
  const [fullView, setFullView] = useState(
    new Array(countries.length).fill(false)
  );

  const toggleView = (idx) => {
    const copy = [...fullView];
    copy[idx] = !copy[idx];
    setFullView(copy);
  };

  const renderCountries = (countries) => (
    <ul>
      {countries.map(({ name }, idx) => (
        <li key={name}>
          <span>{name}</span>
          <button onClick={() => toggleView(idx)}>show</button>
          {fullView[idx] && <Country country={countries[idx]} />}
        </li>
      ))}
    </ul>
  );

  if (countries.length > 10) {
    return <span>too many matches specify another filter</span>;
  }

  return countries.length === 1 ? (
    <Country country={countries[0]} />
  ) : (
    renderCountries(countries)
  );
};

export default Countries;
