import React from 'react';
import { Link } from 'react-router-dom';
import getGallery from '../getGallery.js';
import './Dropdown.css';

export default function Dropdown(props) {
  const { onSelect } = props;
  const animeList = getGallery();

  return (
    <ul className='dropdown-menu' role='menu'>
      {animeList.map((anime) => (
        <li key={anime.id}>
          <Link className={anime.cName} to={`/${anime.id}`} role='menuitem' onClick={onSelect}>
            {anime.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
