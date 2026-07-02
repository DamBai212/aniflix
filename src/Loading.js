import React from 'react';
import './Loading.css';

export default function Loading(props) {
  const {
    kicker = 'AniFlix data sync',
    title = 'Loading the anime shelf',
    body = 'Pulling the latest AniFlix catalog into view so the gallery, details page, and navigation stay in sync.'
  } = props;

  return (
    <main className='loading-page'>
      <section className='loading-panel' role='status' aria-live='polite'>
        <p className='loading-kicker'>{kicker}</p>
        <h1>{title}</h1>
        <p className='loading-copy'>{body}</p>
        <div className='loading-skeleton-row' aria-hidden='true'>
          <span className='loading-skeleton loading-skeleton-wide' />
          <span className='loading-skeleton loading-skeleton-mid' />
          <span className='loading-skeleton loading-skeleton-short' />
        </div>
      </section>
    </main>
  );
}
