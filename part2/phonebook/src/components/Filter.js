const Filter = ({ searchTerm, handleSearchTermChange }) => (
  <div>
    search: <input value={searchTerm} onChange={handleSearchTermChange} />
  </div>
);

export default Filter;
