import React from 'react';
import { Link } from 'react-router-dom';

export default function StaticPage(props) {
  return (
    <main className='content-page'>
      <section className='content-panel'>
        <p className='content-eyebrow'>AniFlix</p>
        <h1>{props.title}</h1>
        <p>{props.body}</p>
        <Link className='content-link' to='/'>
          Back to home page
        </Link>
      </section>
    </main>
  );
}
