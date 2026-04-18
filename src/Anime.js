import React from 'react';
import { Link } from 'react-router-dom';

export default function Anime({ animeData, index }) {
  const {
    id,
    name,
    cover,
    genre,
    year,
    rating,
    tagline,
    accent,
    accentSoft
  } = animeData;

  return (
    <Link
      to={`/${id}`}
      className='item'
      style={{
        '--card-accent': accent,
        '--card-accent-soft': accentSoft,
        '--card-delay': `${index * 90}ms`
      }}
    >
      <article className='poster-frame'>
        <span className='item-rank'>{String(index + 1).padStart(2, '0')}</span>
        <img src={cover} alt={`${name} logo`} />
        <div className='overlay'>
          <div className='overlay-top'>
            <span>{genre}</span>
            <span>{year}</span>
          </div>
          <div className='overlay-copy'>
            <h2>{name}</h2>
            <p>{tagline}</p>
          </div>
          <div className='overlay-bottom'>
            <span>{rating}/5 rating</span>
            <span className='overlay-link-label'>View details</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
