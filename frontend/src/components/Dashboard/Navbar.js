import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDropDown from './User';
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                            </svg>
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