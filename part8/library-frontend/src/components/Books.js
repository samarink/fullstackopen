import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);

      // build an array of unique genres from received books
      setGenres([
        ...new Set(
          result.data.allBooks.reduce(
            (genres, book) => [...genres, ...book.genres],
            []
          )
        ),
      ]);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  const booksToShow =
    filter === 'all'
      ? books
      : books.filter((book) => book.genres.includes(filter));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
