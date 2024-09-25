import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(null);  // null for initial state to differentiate between loading and unauthenticated
    const [loading, setLoading] = useState(true);
    const location = useLocation();  // Get the current route

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            
            setAuth(result);  // Set true if authenticated, false otherwise
            setLoading(false); // Set loading to false after checking auth
        };
        checkAuth();  // Check authentication on route change
    }, [location]);  // Re-run every time location (route) changes

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }
    // If not authenticated, redirect to login
    if (!auth) {
        console.log("Not authenticated, redirecting to login")
        return <Navigate to="/login" replace />;        
    }

    // If authenticated, render the child components
    return children;

};

export default ProtectedRoute;