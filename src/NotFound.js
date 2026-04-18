import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className='content-page content-page--compact'>
      <section className='content-panel'>
        <p className='content-eyebrow'>404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist in the AniFlix collection.</p>
        <Link className='content-link' to='/'>
          Return to home page
        </Link>
      </section>
    </main>
  );
}
