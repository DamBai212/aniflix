import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, 'Test page', '/');
});

test('renders the anime gallery on the home route', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome to aniflix/i })).toBeInTheDocument();
  expect(screen.getByAltText(/jujutsu logo/i)).toBeInTheDocument();
});

test('renders the sign up page', () => {
  window.history.pushState({}, 'Sign up page', '/sign-up');

  render(<App />);

  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  expect(screen.getByText(/create your aniflix account/i)).toBeInTheDocument();
});

test('renders anime details for a known route', () => {
  window.history.pushState({}, 'Jujutsu page', '/jujutsu');

  render(<App />);

  expect(screen.getByRole('heading', { name: /jujutsu/i })).toBeInTheDocument();
  expect(screen.getByText(/yuji itadori/i)).toBeInTheDocument();
});
