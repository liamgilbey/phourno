import React, { useState } from 'react';
import { uploadPhoto } from '../../services/api';
import '../../styles/Modal.css'

const UploadPhotoModal = ({ isOpen, onClose, onSubmit, date }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const photoDate = date.toISOString().slice(0, 10);
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('photo_date', photoDate);

        try {
            await uploadPhoto(formData, token);
            alert('Photo uploaded successfully!');
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed. Please try again.');
        }
    };

    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Upload Photo for {date.toDateString()}</h2>
                <input type="file" onChange={(e) => setFile(e.target.files[0])}  required />
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Upload</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
            {error && (
                <p style={{ color: 'red' }}>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )} 
        </div>
    );
};

export default UploadPhotoModal;


