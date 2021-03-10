import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { BOOKS_BY_GENRE, GET_USER } from '../queries';

const Recommendations = (props) => {
  const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE);
  const userResult = useQuery(GET_USER);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userResult.data) {
      getBooks({ variables: { genre: userResult.data.me.favoriteGenre } });
    }
  }, [userResult, getBooks]);

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [booksResult]);

  if (!props.show) return null;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
