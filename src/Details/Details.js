import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  getAnimeById,
  getAnimeCatalog
} from '../data/animeRepository.js';
import './Details.css';

function DetailStat({ label, value }) {
  return (
    <div className='details-stat'>
      <span className='details-stat-label'>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DetailFeature({ label, title, copy }) {
  return (
    <article className='details-feature'>
      <p className='details-feature-label'>{label}</p>
      <h3 className='details-feature-title'>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function RecommendationCard({ animeData }) {
  return (
    <Link to={`/${animeData.id}`} className='details-recommendation'>
      <img
        className='details-recommendation-image'
        src={animeData.cover}
        alt={`${animeData.name} poster art`}
      />
      <div className='details-recommendation-copy'>
        <span className='details-recommendation-meta'>
          {animeData.genre} • {animeData.year}
        </span>
        <h3 className='details-recommendation-title'>{animeData.name}</h3>
        <p>{animeData.tagline}</p>
      </div>
    </Link>
  );
}

export default function Details(props) {
  const animeList = getAnimeCatalog();
  const selectedAnime = getAnimeById(props.match.params.animeId);

  if (!selectedAnime) {
    return <Redirect to='/not-found' />;
  }

  const detailStats = [
    { label: 'Genre', value: selectedAnime.genre },
    { label: 'Release', value: selectedAnime.year },
    { label: 'Rating', value: `${selectedAnime.rating}/5` }
  ];

  const featureCards = [
    {
      label: 'Mood',
      title: selectedAnime.tagline,
      copy: `A ${selectedAnime.genre.toLowerCase()} spotlight framed for high-impact browsing and late-night queue energy.`
    },
    {
      label: 'Release',
      title: selectedAnime.year,
      copy: `A standout library pick from ${selectedAnime.year} that still feels right at home on a modern streaming shelf.`
    },
    {
      label: 'Viewer Score',
      title: `${selectedAnime.rating}/5`,
      copy: 'One of the strongest-rated titles in the AniFlix collection, with the artwork and synopsis leading the experience.'
    }
  ];

  const recommendedAnime = animeList
    .filter((anime) => anime.id !== selectedAnime.id)
    .slice(0, 3);

  return (
    <main
      className='details-page'
      style={{
        '--details-accent': selectedAnime.accent,
        '--details-accent-soft': selectedAnime.accentSoft,
        '--details-cover': `url(${selectedAnime.cover})`
      }}
    >
      <section className='details-hero'>
        <div className='details-copy'>
          <Link className='details-back-link' to='/'>
            Back to home page
          </Link>
          <p className='details-eyebrow'>{selectedAnime.genre} spotlight</p>
          <h1 className='details-title'>{selectedAnime.name}</h1>
          <p className='details-tagline'>{selectedAnime.tagline}</p>
          <div className='details-meta'>
            <span>{selectedAnime.genre}</span>
            <span>{selectedAnime.year}</span>
            <span>{selectedAnime.rating}/5 rating</span>
          </div>
          <p className='details-synopsis'>{selectedAnime.synopsis}</p>
          <div className='details-actions'>
            <Link to='/animes' className='action-button action-button-primary'>
              Browse more anime
            </Link>
            <Link to='/' className='action-button action-button-secondary'>
              Return home
            </Link>
          </div>
        </div>

        <div className='details-poster-column'>
          <div className='details-poster-card'>
            <img
              className='details-poster-image'
              src={selectedAnime.cover}
              alt={selectedAnime.name}
            />
          </div>
          <div className='details-summary'>
            <p className='details-summary-label'>Now spotlighting</p>
            <div className='details-stats'>
              {detailStats.map((stat) => (
                <DetailStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='details-grid'>
        <div className='details-section'>
          <p className='details-section-kicker'>Why it stands out</p>
          <h2 className='details-section-title'>A binge-worthy pick for the AniFlix shelf</h2>
          <p className='details-panel-copy'>
            This view leans into a cinematic presentation, pairing stronger typography,
            focused metadata, and immersive artwork so each title feels like a featured
            streaming release instead of a plain detail screen.
          </p>

          <div className='details-feature-grid'>
            {featureCards.map((feature) => (
              <DetailFeature
                key={feature.label}
                label={feature.label}
                title={feature.title}
                copy={feature.copy}
              />
            ))}
          </div>
        </div>

        <aside className='details-section details-section--secondary'>
          <p className='details-section-kicker'>Keep watching</p>
          <h2 className='details-section-title'>More from the collection</h2>
          <div className='details-recommendations'>
            {recommendedAnime.map((anime) => (
              <RecommendationCard key={anime.id} animeData={anime} />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
