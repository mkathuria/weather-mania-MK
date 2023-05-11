import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import { createRenderer } from 'react-dom/test-utils';

afterEach(() => {
  cleanup()
})

test('renders learn react link', () => {
  // render any element and check if it is rendered properly of not
  render(<App />);
  const linkElement = screen.getByText(/Hook/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("Hook");
  expect(linkElement).toContainHTML("<div>");
});



test('matches snapshot', () => {
  // render any element and check if it is rendered properly of not
  const tree = createRenderer(<App />).toJSON();

  //create a snapshot and store in folder
  expect(tree).toMatchSnapshot();
});
