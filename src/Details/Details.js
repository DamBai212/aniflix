import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  getAnimeById
} from '../data/animeRepository.js';
import { useAnimeData } from '../data/AnimeDataContext.js';
import Loading from '../Loading.js';
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

function ClipMeta({ label, value }) {
  return (
    <div className='details-clip-meta-row'>
      <span className='details-clip-meta-label'>{label}</span>
      <strong className='details-clip-meta-value'>{value}</strong>
    </div>
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
  const { animeCatalog, status, reloadAnimeCatalog } = useAnimeData();

  if (status === 'loading') {
    return (
      <Loading
        title='Loading anime details'
        body='Syncing the selected title with the shared AniFlix catalog so the detail page, recommendations, and official clip stay aligned.'
      />
    );
  }

  if (status === 'error') {
    return (
      <main className='content-page'>
        <section className='content-panel'>
          <p className='content-eyebrow'>Detail page offline</p>
          <h1>We could not load this anime right now</h1>
          <p>
            The detail screen now reads from the same shared catalog as the rest of the app, and
            that request did not complete. Try the fetch again or browse back to the home page.
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

  const animeList = animeCatalog;
  const selectedAnime = getAnimeById(props.match.params.animeId, animeList);

  if (!selectedAnime) {
    return <Redirect to='/not-found' />;
  }

  const mediaClip = selectedAnime.mediaClip;

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
            {mediaClip ? (
              <a href='#details-media' className='action-button action-button-secondary'>
                Jump to official clip
              </a>
            ) : null}
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

      {mediaClip ? (
        <section id='details-media' className='details-media-layout'>
          <div className='details-section details-media-section'>
            <p className='details-section-kicker'>Official clip</p>
            <h2 className='details-section-title'>Preview the vibe before you commit to the binge</h2>
            <p className='details-panel-copy'>
              AniFlix now pulls in a verified trailer or distributor clip so each detail page
              feels more alive without hosting copyrighted footage directly.
            </p>

            <div className='details-media-frame'>
              <iframe
                src={mediaClip.embedUrl}
                title={`${selectedAnime.name} official trailer player`}
                loading='lazy'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
            </div>
          </div>

          <aside className='details-section details-section--secondary details-media-aside'>
            <p className='details-section-kicker'>Source details</p>
            <h2 className='details-section-title'>{mediaClip.title}</h2>
            <p className='details-panel-copy'>
              This clip is embedded from the official or licensed distributor upload to keep the
              experience interactive while staying transparent about where the footage comes from.
            </p>

            <div className='details-clip-meta'>
              <ClipMeta label='Clip type' value={mediaClip.type} />
              <ClipMeta label='Provider' value={mediaClip.provider} />
              <ClipMeta label='Source' value={mediaClip.sourceLabel} />
            </div>

            <a
              className='details-source-link'
              href={mediaClip.sourceUrl}
              target='_blank'
              rel='noreferrer'
            >
              Watch {selectedAnime.name} clip on YouTube
            </a>
          </aside>
        </section>
      ) : null}

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
