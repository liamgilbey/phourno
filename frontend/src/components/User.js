import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/User.css'

const UserDropDown = ({ isOpen }) => {
    const navigate = useNavigate();
    const handleLogout = () => {    
        localStorage.removeItem('token');
        navigate('/login');
    };

    console.log("click")

    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <ul class="dropdown-menu">
            <li><a href="" onClick={handleLogout}>Logout</a></li>
        </ul>
    )
}

export default UserDropDown;