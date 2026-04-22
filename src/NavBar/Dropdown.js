import React from 'react';
import { Link } from 'react-router-dom';
import { useAnimeData } from '../data/AnimeDataContext.js';
import './Dropdown.css';

export default function Dropdown(props) {
  const { onSelect } = props;
  const { animeCatalog, status } = useAnimeData();

  if (status === 'loading') {
    return (
      <ul className='dropdown-menu' role='menu'>
        <li className='dropdown-status-item'>
          <span className='dropdown-status-text'>Loading collection...</span>
        </li>
      </ul>
    );
  }

  if (status === 'error') {
    return (
      <ul className='dropdown-menu' role='menu'>
        <li className='dropdown-status-item'>
          <span className='dropdown-status-text'>Collection unavailable right now.</span>
        </li>
      </ul>
    );
  }

  return (
    <ul className='dropdown-menu' role='menu'>
      {animeCatalog.map((anime) => (
        <li key={anime.id}>
          <Link className={anime.cName} to={`/${anime.id}`} role='menuitem' onClick={onSelect}>
            {anime.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
