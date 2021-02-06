const Filter = ({ search, handleSearchChange }) => (
  <div>
    search: <input value={search} onChange={handleSearchChange} />
  </div>
);

export default Filter;
