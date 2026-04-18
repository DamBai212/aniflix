import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import './NavBar.css';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownOpenSourceRef = useRef('');

  const supportsDesktopDropdown = () => window.innerWidth >= 960;

  const toggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const openDropdown = (source) => {
    if (!supportsDesktopDropdown()) {
      return;
    }

    if (isDropdownOpen && dropdownOpenSourceRef.current === 'click' && source !== 'click') {
      return;
    }

    dropdownOpenSourceRef.current = source;
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownOpenSourceRef.current = '';
    setIsDropdownOpen(false);
  };

  const handleDropdownMouseDown = (event) => {
    if (supportsDesktopDropdown()) {
      event.preventDefault();
    }
  };

  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeDropdown();
    }
  };

  const handleDropdownSelect = () => {
    closeDropdown();
    closeMobileMenu();
  };

  const handleDropdownTriggerClick = (event) => {
    if (!supportsDesktopDropdown()) {
      handleDropdownSelect();
      return;
    }

    event.preventDefault();

    if (!isDropdownOpen) {
      dropdownOpenSourceRef.current = 'click';
      setIsDropdownOpen(true);
      return;
    }

    if (dropdownOpenSourceRef.current === 'click') {
      closeDropdown();
      return;
    }

    dropdownOpenSourceRef.current = 'click';
  };

  return (
    <nav className='navbar'>
      <div className='navbar-shell'>
        <Link to='/' className='navbar-logo' onClick={handleDropdownSelect}>
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
            onMouseEnter={() => openDropdown('hover')}
            onMouseLeave={closeDropdown}
            onFocus={() => openDropdown('focus')}
            onBlur={handleDropdownBlur}
          >
            <Link
              to='/animes'
              className='nav-links'
              onMouseDown={handleDropdownMouseDown}
              onClick={handleDropdownTriggerClick}
              aria-haspopup='menu'
              aria-expanded={isDropdownOpen}
            >
              Animes <i className='fas fa-caret-down' />
            </Link>
            {isDropdownOpen && <Dropdown onSelect={handleDropdownSelect} />}
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
