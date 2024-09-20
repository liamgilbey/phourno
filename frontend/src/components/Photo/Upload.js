import React, { useState } from 'react';
import { uploadPhoto } from '../../services/api';

const UploadPhoto = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);

        try {
            await uploadPhoto(formData, token);
            alert('Photo uploaded successfully!');
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Photo</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    required 
                />
                <button type="submit">Upload</button>
            </form>
            {error && (
                <p style={{ color: 'red' }}>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}            
        </div>
        
        
    );
};

export default UploadPhoto;
