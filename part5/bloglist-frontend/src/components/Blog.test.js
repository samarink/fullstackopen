import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const title = 'sample title';
  const author = 'Jon Doe';
  const url = 'http://example.com/blog/22';
  const likes = 0;
  let component;

  beforeEach(() => {
    const blog = { title, author, url, likes };
    component = render(<Blog blog={blog}  />);
  });

  test('by default renders blog title and author but not url and likes', () => {
    expect(component.container).toHaveTextContent(title);
    expect(component.container).toHaveTextContent(author);
    expect(component.container).not.toHaveTextContent(url);
    expect(component.container).not.toHaveTextContent(likes);
  });

  test('url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const button = component.getByText('show');

    fireEvent.click(button);

    expect(component.container).toHaveTextContent(title);
    expect(component.container).toHaveTextContent(author);
    expect(component.container).toHaveTextContent(url);
    expect(component.container).toHaveTextContent(likes);
  });
});
