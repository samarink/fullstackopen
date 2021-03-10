import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, GET_USER } from '../queries';

const Recommendations = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const userResult = useQuery(GET_USER);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }

    if (userResult.data) {
      setUser(userResult.data.me);
    }
  }, [booksResult, userResult]);

  if (!props.show) return null;

  const booksToShow = books.filter((book) =>
    book.genres.includes(user.favoriteGenre)
  );

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
    </div>
  );
};

export default Recommendations;
