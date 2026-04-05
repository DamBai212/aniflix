import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getGallery from './getGallery.js';
import Anime from './Anime.js';
import Slider from './Slider.js';

const featuredAnimeIds = ['jujutsu', 'onepiece', 'myheroacademia', 'attackontitan'];

export default function Gallery() {
  const animeList = getGallery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const genreOptions = ['All', ...new Set(animeList.map((anime) => anime.genre))];
  const filteredAnimeList = animeList.filter((anime) => {
    const matchesGenre = selectedGenre === 'All' || anime.genre === selectedGenre;
    const matchesSearch = normalizedSearchTerm === ''
      || [anime.name, anime.genre, anime.tagline]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchTerm);

    return matchesGenre && matchesSearch;
  });
  const featuredItems = featuredAnimeIds
    .map((animeId) => filteredAnimeList.find((anime) => anime.id === animeId))
    .filter(Boolean);
  const carouselItems = featuredItems.length > 0 ? featuredItems : filteredAnimeList;
  const featuredCount = carouselItems.length;
  const featuredAnime = carouselItems[currentIndex] || null;
  const hasActiveFilters = selectedGenre !== 'All' || normalizedSearchTerm !== '';
  const trimmedSearchTerm = searchTerm.trim();
  const showcaseHighlights = featuredAnime
    ? [
      `${filteredAnimeList.length} ${filteredAnimeList.length === 1 ? 'title' : 'titles'} in view`,
      selectedGenre === 'All' ? 'All genres' : selectedGenre,
      trimmedSearchTerm ? `Search: ${trimmedSearchTerm}` : 'Cinematic anime discovery'
    ]
    : [
      selectedGenre === 'All' ? 'All genres' : selectedGenre,
      trimmedSearchTerm ? `Search: ${trimmedSearchTerm}` : 'Try another filter',
      'Reset to reopen the full lineup'
    ];
  const showcaseSummary = hasActiveFilters
    ? `Shift the spotlight with live filters, narrow the shelf by genre, and home in on the next anime to queue up.`
    : `Step into a curated anime gallery built for late-night binge energy, bold poster art, and the feeling of opening a streaming homepage with your next obsession already waiting.`;
  const resultsCopy = `Showing ${filteredAnimeList.length} ${filteredAnimeList.length === 1 ? 'title' : 'titles'} ${selectedGenre === 'All' ? 'across all genres' : `in ${selectedGenre}`}${trimmedSearchTerm ? ` for "${trimmedSearchTerm}"` : ''}.`;

  useEffect(() => {
    if (currentIndex < featuredCount) {
      return;
    }

    setCurrentIndex(0);
  }, [currentIndex, featuredCount]);

  const handleNext = () => {
    if (featuredCount <= 1) {
      return;
    }

    setCurrentIndex((previousIndex) => (previousIndex + 1) % featuredCount);
  };

  const handlePrev = () => {
    if (featuredCount <= 1) {
      return;
    }

    setCurrentIndex((previousIndex) => (previousIndex - 1 + featuredCount) % featuredCount);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentIndex(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentIndex(0);
  };

  const clearFilters = () => {
    setSelectedGenre('All');
    setSearchTerm('');
    setCurrentIndex(0);
  };

  return (
    <main className='gallery-page'>
      <section className='showcase'>
        {featuredAnime ? (
          <div
            className='showcase-panel'
            style={{
              '--showcase-image': `url(${featuredAnime.cover})`,
              '--showcase-accent-soft': featuredAnime.accentSoft
            }}
          >
            <p className='showcase-eyebrow'>{hasActiveFilters ? 'Filtered spotlight' : 'Anime streaming, reimagined'}</p>
            <h1>{hasActiveFilters ? `Now showing ${featuredAnime.name}` : 'Welcome to AniFlix'}</h1>
            <p className='showcase-summary'>
              {showcaseSummary}
            </p>
            <div className='showcase-actions'>
              <Link to={`/${featuredAnime.id}`} className='action-button action-button-primary'>
                Spotlight {featuredAnime.name}
              </Link>
              {hasActiveFilters ? (
                <button type='button' className='action-button action-button-secondary' onClick={clearFilters}>
                  Clear filters
                </button>
              ) : (
                <Link to='/animes' className='action-button action-button-secondary'>
                  Browse all anime
                </Link>
              )}
            </div>
            <div className='showcase-highlights'>
              {showcaseHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className='showcase-panel showcase-panel--empty'>
            <p className='showcase-eyebrow'>No matches in view</p>
            <h1>Reset the lineup</h1>
            <p className='showcase-summary'>
              No anime matched the current search and filter mix. Clear the controls to jump back into the full AniFlix shelf.
            </p>
            <div className='showcase-actions'>
              <button type='button' className='action-button action-button-primary' onClick={clearFilters}>
                Clear filters
              </button>
              <Link to='/animes' className='action-button action-button-secondary'>
                Browse all anime
              </Link>
            </div>
            <div className='showcase-highlights'>
              {showcaseHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>
        )}

        {featuredAnime ? (
          <div
            className='featured-carousel'
            style={{
              '--card-accent': featuredAnime.accent,
              '--card-accent-soft': featuredAnime.accentSoft
            }}
          >
            <div className='featured-carousel-topbar'>
              <span className='featured-carousel-label'>{hasActiveFilters ? 'Matching Picks' : 'Featured Picks'}</span>
              <span className='featured-carousel-counter'>
                {String(currentIndex + 1).padStart(2, '0')} / {String(featuredCount).padStart(2, '0')}
              </span>
            </div>

            <div key={featuredAnime.id} className='featured-carousel-stage' aria-live='polite'>
              <div className='featured-carousel-media'>
                <button
                  type='button'
                  className='featured-carousel-control featured-carousel-control-prev'
                  onClick={handlePrev}
                  aria-label='Show previous featured pick'
                  disabled={featuredCount <= 1}
                >
                  <span aria-hidden='true'>&lsaquo;</span>
                </button>

                <div className='featured-carousel-poster'>
                  <img
                    src={featuredAnime.cover}
                    alt={`${featuredAnime.name} featured art`}
                  />
                </div>

                <button
                  type='button'
                  className='featured-carousel-control featured-carousel-control-next'
                  onClick={handleNext}
                  aria-label='Show next featured pick'
                  disabled={featuredCount <= 1}
                >
                  <span aria-hidden='true'>&rsaquo;</span>
                </button>
              </div>
              <div className='featured-carousel-copy'>
                <div className='featured-carousel-meta'>
                  <span>{featuredAnime.genre}</span>
                  <span>{featuredAnime.year}</span>
                  <span>{featuredAnime.rating}/5 rating</span>
                </div>
                <h2>{featuredAnime.name}</h2>
                <p>{featuredAnime.tagline}</p>
                <Link to={`/${featuredAnime.id}`} className='featured-carousel-link'>
                  View details
                </Link>
              </div>
            </div>

            <div className='featured-carousel-footer'>
              <div className='featured-carousel-indicators' aria-hidden='true'>
                {carouselItems.map((anime, index) => (
                  <span
                    key={anime.id}
                    className={`featured-carousel-indicator ${index === currentIndex ? 'is-active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='featured-carousel featured-carousel--empty'>
            <div className='featured-carousel-topbar'>
              <span className='featured-carousel-label'>Matching Picks</span>
              <span className='featured-carousel-counter'>00 / 00</span>
            </div>
            <div className='featured-carousel-empty'>
              <p className='featured-carousel-empty-label'>No featured results</p>
              <h2>Broaden the search</h2>
              <p>
                Try a different title, remove a genre filter, or clear everything to bring the full curated lineup back.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className='gallery-shell'>
        <div className='section-heading'>
          <div>
            <p className='section-kicker'>Handpicked Collection</p>
            <h2>Start your next binge</h2>
          </div>
          <p className='section-copy'>
            Scroll through a streaming-style row with stronger motion, layered poster
            depth, and quick access to the next anime worth queueing up.
          </p>
        </div>
        <div className='gallery-toolbar'>
          <label className='gallery-search' htmlFor='gallery-search-input'>
            <span className='gallery-search-label'>Search the collection</span>
            <input
              id='gallery-search-input'
              className='gallery-search-input'
              type='search'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search by title, genre, or vibe'
              aria-label='Search anime collection'
            />
          </label>

          <div className='gallery-filter-group'>
            <span className='gallery-search-label'>Genre filters</span>
            <div className='gallery-filter-row' role='toolbar' aria-label='Filter anime by genre'>
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

        {filteredAnimeList.length > 0 ? (
          <Slider
            items={filteredAnimeList}
            ariaLabel={hasActiveFilters ? 'Filtered anime results' : 'Start your next binge'}
            renderItem={(anime, index) => (
              <Anime
                animeData={anime}
                index={index}
              />
            )}
          />
        ) : (
          <div className='gallery-empty-state' role='status'>
            <p className='gallery-empty-state-label'>Collection reset recommended</p>
            <h3>No anime matched your search</h3>
            <p>
              Try a broader search term, switch genres, or clear the controls to reopen the full AniFlix collection.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
