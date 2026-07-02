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

function DetailFact({ label, value }) {
  return (
    <article className='details-fact-card'>
      <p className='details-fact-label'>{label}</p>
      <h3 className='details-fact-value'>{value}</h3>
    </article>
  );
}

function DetailPillGroup({ title, items }) {
  return (
    <section className='details-chip-panel'>
      <h3 className='details-subsection-title'>{title}</h3>
      <div className='details-pill-row'>
        {items.map((item) => (
          <span key={item} className='details-pill'>{item}</span>
        ))}
      </div>
    </section>
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
  const detailFacts = [
    { label: 'Original title', value: selectedAnime.originalTitle },
    { label: 'Format', value: selectedAnime.format },
    { label: 'Seasons', value: selectedAnime.seasonCountLabel },
    { label: 'Episode scope', value: selectedAnime.episodeCountLabel },
    { label: 'Studio', value: selectedAnime.studio },
    { label: 'Setting', value: selectedAnime.setting }
  ];

  const detailStats = [
    { label: 'Studio', value: selectedAnime.studio },
    { label: 'Status', value: selectedAnime.releaseStatus },
    { label: 'Episodes', value: selectedAnime.episodeCountLabel },
    { label: 'Runtime', value: selectedAnime.runtime }
  ];

  const featureCards = [
    {
      label: 'World',
      title: selectedAnime.setting,
      copy: `A ${selectedAnime.format.toLowerCase()} framed around ${selectedAnime.signatureTags[0].toLowerCase()} and built for high-stakes late-night queue energy.`
    },
    {
      label: 'Runway',
      title: selectedAnime.episodeCountLabel,
      copy: `${selectedAnime.seasonCountLabel} of momentum means plenty of space for ${selectedAnime.signatureTags[1].toLowerCase()} and long-form payoff.`
    },
    {
      label: 'Craft',
      title: selectedAnime.studio,
      copy: `Queue it up in ${selectedAnime.audioOptions.join(' or ').toLowerCase()} when you want ${selectedAnime.signatureTags[2].toLowerCase()} with polished character-forward staging.`
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
          {selectedAnime.originalTitle !== selectedAnime.name ? (
            <p className='details-original-title'>Original title: {selectedAnime.originalTitle}</p>
          ) : null}
          <p className='details-tagline'>{selectedAnime.tagline}</p>
          <div className='details-meta'>
            <span>{selectedAnime.genre}</span>
            <span>{selectedAnime.format}</span>
            <span>{selectedAnime.year}</span>
            <span>{selectedAnime.releaseStatus}</span>
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
          <p className='details-section-kicker'>Series profile</p>
          <h2 className='details-section-title'>The queue-fit breakdown for this AniFlix spotlight</h2>
          <p className='details-panel-copy'>
            This richer layout gives each title a stronger catalog identity, pairing quick facts,
            tone markers, and series context so the shelf feels closer to a real streaming browse
            flow than a single synopsis block.
          </p>

          <div className='details-facts-grid'>
            {detailFacts.map((fact) => (
              <DetailFact
                key={fact.label}
                label={fact.label}
                value={fact.value}
              />
            ))}
          </div>

          <div className='details-chip-layout'>
            <DetailPillGroup title='Signature tags' items={selectedAnime.signatureTags} />
            <DetailPillGroup title='Audio options' items={selectedAnime.audioOptions} />
          </div>

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
