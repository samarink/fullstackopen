import Weather from './Weather';

const Country = ({
  country: { name, capital, population, languages, flag },
}) => (
  <>
    <h2>{name}</h2>
    <p>capital {capital}</p>
    <p>population {population}</p>
    <h3>languages</h3>
    <ul>
      {languages.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
    <img src={flag} alt={`flag of ${name}`} width="300px" />
    <Weather city={capital} />
  </>
);

export default Country;
