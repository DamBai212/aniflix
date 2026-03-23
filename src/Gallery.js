import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import getGallery from './getGallery.js';
import Anime from './Anime.js';
import Slider from './Slider.js';

const featuredAnimeIds = ['jujutsu', 'onepiece', 'myheroacademia', 'attackontitan'];

export default function Gallery() {
  const animeList = getGallery();
  const featuredItems = featuredAnimeIds
    .map((animeId) => animeList.find((anime) => anime.id === animeId))
    .filter(Boolean);
  const carouselItems = featuredItems.length > 0 ? featuredItems : animeList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredCount = carouselItems.length;
  const featuredAnime = carouselItems[currentIndex] || animeList[0];
  const showcaseHighlights = [
    `${animeList.length} curated titles`,
    'Poster-first browsing',
    'Cinematic anime discovery'
  ];

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

  return (
    <main className='gallery-page'>
      <section className='showcase'>
        <div
          className='showcase-panel'
          style={{
            '--showcase-image': `url(${featuredAnime.cover})`,
            '--showcase-accent-soft': featuredAnime.accentSoft
          }}
        >
          <p className='showcase-eyebrow'>Anime streaming, reimagined</p>
          <h1>Welcome to AniFlix</h1>
          <p className='showcase-summary'>
            Step into a curated anime gallery built for late-night binge energy,
            bold poster art, and the feeling of opening a streaming homepage with
            your next obsession already waiting.
          </p>
          <div className='showcase-actions'>
            <Link to={`/${featuredAnime.id}`} className='action-button action-button-primary'>
              Spotlight {featuredAnime.name}
            </Link>
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

        <div
          className='featured-carousel'
          style={{
            '--card-accent': featuredAnime.accent,
            '--card-accent-soft': featuredAnime.accentSoft
          }}
        >
          <div className='featured-carousel-topbar'>
            <span className='featured-carousel-label'>Featured Picks</span>
            <div className='featured-carousel-controls'>
              <button
                type='button'
                className='featured-carousel-control'
                onClick={handlePrev}
                aria-label='Show previous featured pick'
                disabled={featuredCount <= 1}
              >
                <span aria-hidden='true'>&lsaquo;</span>
              </button>
              <button
                type='button'
                className='featured-carousel-control'
                onClick={handleNext}
                aria-label='Show next featured pick'
                disabled={featuredCount <= 1}
              >
                <span aria-hidden='true'>&rsaquo;</span>
              </button>
            </div>
          </div>

          <div key={featuredAnime.id} className='featured-carousel-stage' aria-live='polite'>
            <div className='featured-carousel-poster'>
              <img
                src={featuredAnime.cover}
                alt={`${featuredAnime.name} featured art`}
              />
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
            <span className='featured-carousel-position'>
              {String(currentIndex + 1).padStart(2, '0')} / {String(featuredCount).padStart(2, '0')}
            </span>
          </div>
        </div>
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
        <Slider
          items={animeList}
          ariaLabel='Start your next binge'
          renderItem={(anime, index) => (
            <Anime
              animeData={anime}
              index={index}
            />
          )}
        />
      </section>
    </main>
  );
}
