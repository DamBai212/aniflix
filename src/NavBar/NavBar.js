import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import './NavBar.css';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDropdownEnter = () => {
    setIsDropdownOpen(window.innerWidth >= 960);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-shell'>
        <Link to='/' className='navbar-logo'>
          AniFlix
        </Link>

        <button
          type='button'
          className='menu-icon'
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </button>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              to='/animes'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Animes <i className='fas fa-caret-down' />
            </Link>
            {isDropdownOpen && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/contacts'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contacts
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/sign-up'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Sign up
            </Link>
          </li>
        </ul>

        <div className='navbar-cta'>
          <Button />
        </div>
      </div>
    </nav>
  );
}
