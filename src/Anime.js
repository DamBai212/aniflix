import React from 'react';
import { Link } from 'react-router-dom'

export default function Anime(props) {
    return (
      <Link
        to={`/${props.id}`}
        className='item'
        style={{
          '--card-accent': props.accent,
          '--card-accent-soft': props.accentSoft,
          '--card-delay': `${props.index * 90}ms`
        }}
      >
        <div className='poster-frame'>
          <span className='item-rank'>{String(props.index + 1).padStart(2, '0')}</span>
          <img src={props.cover} alt={`${props.name} logo`} />
          <div className='overlay'>
            <div className='overlay-top'>
              <span>{props.genre}</span>
              <span>{props.year}</span>
            </div>
            <div className='overlay-copy'>
              <h2>{props.name}</h2>
              <p>{props.tagline}</p>
            </div>
            <div className='overlay-bottom'>
              <span>{props.rating}/5 rating</span>
              <span>View details</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  
