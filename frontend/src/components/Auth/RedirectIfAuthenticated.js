import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';


const RedirectIfAuthenticated = ({ children }) => {


    const [auth, setAuth] = useState(null);  // null for initial state to differentiate between loading and unauthenticated
    const [loading, setLoading] = useState(true);
    const location = useLocation();  // Get the current route

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            console.log("Checking auth:", result);
            setAuth(result);  // Set true if authenticated, false otherwise
            setLoading(false); // Set loading to false after checking auth
        };
        checkAuth();  // Check authentication on route change
    }, [location]);  // Re-run every time location (route) changes

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }
    // If not authenticated, redirect to login
    if (auth) {
        return <Navigate to="/dashboard" replace  />;
    }

    // If authenticated, render the child components
    return children;    
};

export default RedirectIfAuthenticated;