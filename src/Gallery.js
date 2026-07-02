import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  defaultGenre,
  getAnimeGenres,
  getFeaturedAnime,
  queryAnimeCatalog
} from './data/animeRepository.js';
import { useAnimeData } from './data/AnimeDataContext.js';
import Anime from './Anime.js';
import Loading from './Loading.js';
import Slider from './Slider.js';

const featuredAnimeIds = ['jujutsu', 'onepiece', 'myheroacademia', 'attackontitan'];

function getGalleryFiltersFromSearch(search, genreOptions = null) {
  const searchParams = new URLSearchParams(search);
  const nextGenre = searchParams.get('genre') || defaultGenre;
  const nextSearchTerm = searchParams.get('search') || '';
  const isGenreValid = !genreOptions || genreOptions.includes(nextGenre);

  return {
    selectedGenre: isGenreValid ? nextGenre : defaultGenre,
    searchTerm: nextSearchTerm
  };
}

function buildGallerySearch({ selectedGenre, searchTerm }) {
  const searchParams = new URLSearchParams();
  const trimmedSearchTerm = searchTerm.trim();

  if (selectedGenre !== defaultGenre) {
    searchParams.set('genre', selectedGenre);
  }

  if (trimmedSearchTerm) {
    searchParams.set('search', trimmedSearchTerm);
  }

  const nextSearch = searchParams.toString();

  return nextSearch ? `?${nextSearch}` : '';
}

export default function Gallery() {
  const history = useHistory();
  const location = useLocation();
  const { animeCatalog, status, reloadAnimeCatalog } = useAnimeData();
  const genreOptions = getAnimeGenres(animeCatalog);
  const initialFilters = getGalleryFiltersFromSearch(location.search);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState(initialFilters.selectedGenre);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const filteredAnimeList = queryAnimeCatalog({
    genre: selectedGenre,
    searchTerm
  }, animeCatalog);
  const featuredItems = getFeaturedAnime(featuredAnimeIds, filteredAnimeList);
  const carouselItems = featuredItems.length > 0 ? featuredItems : filteredAnimeList;
  const featuredCount = carouselItems.length;
  const featuredAnime = carouselItems[currentIndex] || null;
  const hasActiveFilters = selectedGenre !== 'All' || searchTerm.trim() !== '';
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

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const nextFilters = getGalleryFiltersFromSearch(location.search, getAnimeGenres(animeCatalog));

    setSelectedGenre(nextFilters.selectedGenre);
    setSearchTerm(nextFilters.searchTerm);
  }, [animeCatalog, location.search, status]);

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const nextSearch = buildGallerySearch({ selectedGenre, searchTerm });

    if (nextSearch === location.search) {
      return;
    }

    history.replace({
      pathname: location.pathname,
      search: nextSearch
    });
  }, [history, location.pathname, location.search, searchTerm, selectedGenre, status]);

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

  const handleFeaturedSelect = (index) => {
    setCurrentIndex(index);
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
    setSelectedGenre(defaultGenre);
    setSearchTerm('');
    setCurrentIndex(0);
  };

  if (status === 'loading') {
    return (
      <Loading
        title='Loading the anime gallery'
        body='Fetching the AniFlix catalog so featured picks, filters, and the browsing shelf all render from the same shared data source.'
      />
    );
  }

  if (status === 'error') {
    return (
      <main className='content-page'>
        <section className='content-panel'>
          <p className='content-eyebrow'>Catalog unavailable</p>
          <h1>The AniFlix shelf could not load</h1>
          <p>
            The gallery is now driven by a shared API-style data flow, and the first catalog
            request did not complete. Try the fetch again or jump back home.
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
              <div className='featured-carousel-indicators' role='group' aria-label='Choose featured pick'>
                {carouselItems.map((anime, index) => (
                  <button
                    key={anime.id}
                    type='button'
                    className={`featured-carousel-indicator ${index === currentIndex ? 'is-active' : ''}`}
                    onClick={() => handleFeaturedSelect(index)}
                    aria-label={`Show ${anime.name}`}
                    aria-current={index === currentIndex ? 'true' : undefined}
                    disabled={index === currentIndex}
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
              placeholder='Search by title, studio, tag, or vibe'
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
