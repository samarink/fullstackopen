import Country from './Country';

const Countries = ({ countries }) => {
  if (countries.length > 10)
    return <span>too many matches specify another filter</span>;

  const renderCountries = (countries) => (
    <ul>
      {countries.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );

  return countries.length === 1 ? (
    <Country country={countries[0]} />
  ) : (
    renderCountries(countries)
  );
};

export default Countries;
