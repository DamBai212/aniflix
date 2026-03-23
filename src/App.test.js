import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, 'Test page', '/');
  Object.defineProperty(window.HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value: jest.fn()
  });
});

test('renders the home route with the featured carousel and anime slider', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /welcome to aniflix/i })).toBeInTheDocument();
  expect(screen.getByText(/featured picks/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /show previous featured pick/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /show next featured pick/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /spotlight jujutsu/i })).toBeInTheDocument();
  expect(screen.getByAltText(/jujutsu featured art/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /start your next binge/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /scroll start your next binge left/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /scroll start your next binge right/i })).toBeInTheDocument();
  expect(screen.getByAltText(/jujutsu logo/i)).toBeInTheDocument();
});

test('moves to the next featured pick when the next button is clicked', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /show next featured pick/i }));

  expect(screen.getByRole('link', { name: /spotlight one piece/i })).toBeInTheDocument();
  expect(screen.getByAltText(/one piece featured art/i)).toBeInTheDocument();
});

test('wraps from the first featured pick to the last when the previous button is clicked', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /show previous featured pick/i }));

  expect(screen.getByRole('link', { name: /spotlight attack on titan/i })).toBeInTheDocument();
  expect(screen.getByAltText(/attack on titan featured art/i)).toBeInTheDocument();
});

test('scrolls the slider when the right button is clicked', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /scroll start your next binge right/i }));

  expect(window.HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({
    left: 320,
    behavior: 'smooth'
  });
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
