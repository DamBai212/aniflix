import React from 'react';
import { Link } from 'react-router-dom';
import getGallery from './getGallery.js';
import Anime from './Anime.js';

export default function Gallery() {
  const animeList = getGallery();
  const featuredAnime = animeList[0];
  const heroHighlights = [
    `${animeList.length} curated titles`,
    'Poster-first browsing',
    'Cinematic anime discovery'
  ];

  return (
    <main className='gallery-page'>
      <section className='hero'>
        <div
          className='hero-copy'
          style={{
            '--hero-image': `url(${featuredAnime.cover})`,
            '--hero-accent-soft': featuredAnime.accentSoft
          }}
        >
          <p className='hero-eyebrow'>Anime streaming, reimagined</p>
          <h1>Welcome to AniFlix</h1>
          <p className='hero-summary'>
            Step into a curated anime gallery built for late-night binge energy,
            bold poster art, and the feeling of opening a streaming homepage with
            your next obsession already waiting.
          </p>
          <div className='hero-actions'>
            <Link to={`/${featuredAnime.id}`} className='hero-button hero-button-primary'>
              Spotlight {featuredAnime.name}
            </Link>
            <Link to='/animes' className='hero-button hero-button-secondary'>
              Browse all anime
            </Link>
          </div>
          <div className='hero-highlights'>
            {heroHighlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>

        <div
          className='hero-feature'
          style={{
            '--card-accent': featuredAnime.accent,
            '--card-accent-soft': featuredAnime.accentSoft
          }}
        >
          <span className='hero-feature-label'>Featured Pick</span>
          <div className='hero-feature-poster'>
            <img
              src={featuredAnime.cover}
              alt={`${featuredAnime.name} featured art`}
            />
          </div>
          <div className='hero-feature-copy'>
            <div className='hero-feature-meta'>
              <span>{featuredAnime.genre}</span>
              <span>{featuredAnime.year}</span>
              <span>{featuredAnime.rating}/5 rating</span>
            </div>
            <h2>{featuredAnime.name}</h2>
            <p>{featuredAnime.tagline}</p>
            <Link to={`/${featuredAnime.id}`} className='hero-feature-link'>
              View details
            </Link>
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
            The gallery now leans into a darker cinematic mood with stronger spacing,
            richer hover states, and cards that give the artwork more room to breathe.
          </p>
        </div>
        <div className='container'>
          {animeList.map((anime, index) => (
            <Anime
              key={anime.id}
              animeData={anime}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
