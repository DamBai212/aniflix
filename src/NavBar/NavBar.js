import React, {useState} from 'react'
import Button from './Button.js'
import { Link } from 'react-router-dom'
import './NavBar.css'
import Dropdown from './Dropdown.js'


export default function NavBar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => setClick(!click);
    const closeMoblieMenu = () => setClick(false);

    return (
        <React.Fragment>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    AniFlix
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                {/* line 24 drags out the menu with the shows listed */}
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick= {closeMoblieMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/:animeId' className='nav-links' onClick= {closeMoblieMenu}>
                            Animes <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown/>}
                    </li>
                    <li className='nav-item'>
                        <Link to='/contacts' className='nav-links' onClick= {closeMoblieMenu}>
                            Contacts
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sign-up' className='nav-links' onClick= {closeMoblieMenu}>
                            Sign up
                        </Link>
                    </li>
                </ul>
                <Button />
            </nav>
        </React.Fragment>
    )
}
