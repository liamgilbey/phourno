import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UploadPhoto from './components/Photo/Upload';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';  // Add ProtectedRoute
import RedirectIfAuthenticated from './components/Auth/RedirectIfAuthenticated';  // Add RedirectIfAuthenticated


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
