import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const title = 'sample title';
  const author = 'Jon Doe';
  const url = 'http://example.com/blog/22';
  const likes = 0;
  const blog = { title, author, url, likes };

  test('by default renders blog title and author but not url and likes', () => {
    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent(title);
    expect(component.container).toHaveTextContent(author);
    expect(component.container).not.toHaveTextContent(url);
    expect(component.container).not.toHaveTextContent(likes);
  });

  test('url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const component = render(<Blog blog={blog} />);
    const button = component.getByText('show');

    fireEvent.click(button);

    expect(component.container).toHaveTextContent(title);
    expect(component.container).toHaveTextContent(author);
    expect(component.container).toHaveTextContent(url);
    expect(component.container).toHaveTextContent(likes);
  });

  /*
  TODO: it's not working

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const mockHandler = jest.fn();

    const { getByText } = render(<Blog blog={blog} handleLike={mockHandler} />);

    const reveal = getByText('show');
    fireEvent.click(reveal);

    const like = getByText('like');
    fireEvent.click(like);
    fireEvent.click(like);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
  */
});
