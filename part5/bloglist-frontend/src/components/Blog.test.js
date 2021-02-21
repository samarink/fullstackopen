import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  test('by default renders blog title and author but not url and likes', () => {
    const title = 'sample title';
    const author = 'Jon Doe';
    const url = 'http://example.com/blog/22';
    const likes = 0;

    const blog = { title, author, url, likes };
    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent(title);
    expect(component.container).toHaveTextContent(author);
    expect(component.container).not.toHaveTextContent(url);
    expect(component.container).not.toHaveTextContent(likes);
  });
});
