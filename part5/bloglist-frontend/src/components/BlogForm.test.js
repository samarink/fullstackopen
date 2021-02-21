import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test(' form calls the event handler it received as props with the right details when a new blog is created', () => {
  const createNewBlog = jest.fn();
  const component = render(<BlogForm createNewBlog={createNewBlog} />);

  const form = component.container.querySelector('#formDiv');

  const authorInput = component.container.querySelector('#author');
  const titleInput = component.container.querySelector('#title');
  const urlInput = component.container.querySelector('#url');

  const title = 'new title';
  const author = 'new author';
  const url = 'new url';

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(authorInput, { target: { value: author } });
  fireEvent.change(urlInput, { target: { value: url } });

  fireEvent.submit(form);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0]).toEqual({ author, title, url });
});
