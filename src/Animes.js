import React from 'react';
import { Link } from 'react-router-dom';
import Anime from './Anime.js';
import Loading from './Loading.js';
import { useAnimeData } from './data/AnimeDataContext.js';
import './App.css';

export default function Animes() {
  const { animeCatalog, status, reloadAnimeCatalog } = useAnimeData();

  if (status === 'loading') {
    return (
      <Loading
        title='Loading every anime'
        body='Opening the full AniFlix shelf from the shared catalog.'
      />
    );
  }

  if (status === 'error') {
    return (
      <main className='content-page'>
        <section className='content-panel'>
          <p className='content-eyebrow'>Catalog unavailable</p>
          <h1>The anime list could not load</h1>
          <p>
            The full browse page reads from the shared AniFlix catalog, and that request did not complete.
          </p>
          <div className='showcase-actions'>
            <button type='button' className='action-button action-button-primary' onClick={reloadAnimeCatalog}>
              Retry catalog fetch
            </button>
            <Link to='/' className='action-button action-button-secondary'>
              Return home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='anime-index-page'>
      <section className='anime-index-hero'>
        <p className='content-eyebrow'>Browse all anime</p>
        <h1>Every AniFlix title</h1>
        <p>
          Jump into the full catalog, from featured picks to fresh additions.
        </p>
        <Link to='/' className='action-button action-button-secondary'>
          Back to home
        </Link>
      </section>

      <section className='anime-index-grid' aria-label='All anime titles'>
        {animeCatalog.map((anime, index) => (
          <Anime
            key={anime.id}
            animeData={anime}
            index={index}
          />
        ))}
      </section>
    </main>
  );
}
