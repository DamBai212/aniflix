import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Anime from './Anime.js';
import Loading from './Loading.js';
import { useAnimeData } from './data/AnimeDataContext.js';
import {
  defaultGenre,
  getAnimeGenres,
  queryAnimeCatalog
} from './data/animeRepository.js';
import './App.css';

export default function Animes() {
  const { animeCatalog, status, reloadAnimeCatalog } = useAnimeData();
  const [selectedGenre, setSelectedGenre] = useState(defaultGenre);
  const [searchTerm, setSearchTerm] = useState('');
  const genreOptions = getAnimeGenres(animeCatalog);
  const filteredAnimeList = queryAnimeCatalog({
    genre: selectedGenre,
    searchTerm
  }, animeCatalog);
  const trimmedSearchTerm = searchTerm.trim();
  const hasActiveFilters = selectedGenre !== defaultGenre || trimmedSearchTerm !== '';
  const resultsCopy = `Showing ${filteredAnimeList.length} ${filteredAnimeList.length === 1 ? 'title' : 'titles'} ${selectedGenre === defaultGenre ? 'across the full catalog' : `in ${selectedGenre}`}${trimmedSearchTerm ? ` for "${trimmedSearchTerm}"` : ''}.`;

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearFilters = () => {
    setSelectedGenre(defaultGenre);
    setSearchTerm('');
  };

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

      <section className='anime-index-controls' aria-label='Browse all anime controls'>
        <div className='gallery-toolbar'>
          <label className='gallery-search' htmlFor='anime-index-search-input'>
            <span className='gallery-search-label'>Search all anime</span>
            <input
              id='anime-index-search-input'
              className='gallery-search-input'
              type='search'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search by title, studio, tag, or mood'
              aria-label='Search all anime'
            />
          </label>

          <div className='gallery-filter-group'>
            <span className='gallery-search-label'>Genre filters</span>
            <div className='gallery-filter-row' role='toolbar' aria-label='Filter all anime by genre'>
              {genreOptions.map((genre) => (
                <button
                  key={genre}
                  type='button'
                  className='gallery-filter-button'
                  aria-pressed={selectedGenre === genre}
                  onClick={() => handleGenreChange(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='gallery-results'>
          <p className='gallery-results-copy'>{resultsCopy}</p>
          {hasActiveFilters && (
            <button type='button' className='gallery-reset-button' onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </section>

      <section className='anime-index-grid' aria-label='All anime titles'>
        {filteredAnimeList.length > 0 ? (
          filteredAnimeList.map((anime, index) => (
            <Anime
              key={anime.id}
              animeData={anime}
              index={index}
            />
          ))
        ) : (
          <div className='gallery-empty-state anime-index-empty-state' role='status'>
            <p className='gallery-empty-state-label'>No catalog matches</p>
            <h3>No anime matched your search</h3>
            <p>
              Try a broader term, switch genres, or clear everything to show the full AniFlix catalog again.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
