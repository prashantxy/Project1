import { render, screen } from '@testing-library/react';
import App from './App';


test('renders React Component Generator header', () => {
  render(<App />);
  const headerElement = screen.getByText(/React Component Generator/i);
  expect(headerElement).toBeInTheDocument();
});
