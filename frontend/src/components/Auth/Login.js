import React, { useState } from 'react';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Adjust path to where your logo is stored

import '../../styles/Login.css';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ 
                username: username, 
                password: password 
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <img src={logo} className="app-logo"></img>
                    <h2 className="app-title">Phourno Login</h2>                    
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email</label>
                        <input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            required 
                        />
                    </div>
                    {error && <p className="error-message">{JSON.stringify(error)}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );    
};

export default Login;