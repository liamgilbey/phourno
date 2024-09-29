import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDropDown from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setisDropdownOpen] = useState(false); // State to control dropdown visibility

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setisDropdownOpen(!isDropdownOpen);
    };    

    // Close dropdown when clicking outside
    const handleOutsideClick = (e) => {
        if (!e.target.closest('.user-dropdown')) {
            setisDropdownOpen(false);
        }
    };   

    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);    

    return (
        <nav className="navbar">
                <div class="navbar-brand">
                    <h2>Phourno</h2>
                </div>                
                <div class="spacer"></div>
                <div class="user-dropdown" onClick={toggleDropdown}>
                    <button class="dropdown-toggle">
                        <div class="dropdown-username">
                            <span>
                                User
                            </span>
                        </div>
                        <div class="drowndown-icon">
                            <FontAwesomeIcon icon={faUser} size="2x" />
                        </div>
                    </button>
                    {isDropdownOpen && (
                        <UserDropDown/>
                    )}                
                </div>
            </nav>
    )
}

export default Navbar;