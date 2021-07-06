import { render, screen } from '@testing-library/react';
import App from './App';

test('App render, with a button, image and text', () => {
  render(<App />);
  const buttonTest = screen.getByRole('button');
  const imgTest = screen.getByRole('img');
  const txtTest = screen.getByText(/Cervejinha hmm/);
  expect(buttonTest).toBeInTheDocument();
  expect(imgTest).toBeInTheDocument();
  expect(txtTest).toBeInTheDocument();

});
