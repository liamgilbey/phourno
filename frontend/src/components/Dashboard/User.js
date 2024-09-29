import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/User.css'

const UserDropDown = () => {
    const navigate = useNavigate();
    const handleLogout = () => {    
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
            <ul class="dropdown-menu">
                <li><a href="" onClick={handleLogout}>Logout</a></li>
            </ul>
    )
}

export default UserDropDown;