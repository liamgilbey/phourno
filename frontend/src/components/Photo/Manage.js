import React, { useState } from 'react';
import { deletePhoto } from '../../services/api';
import '../../styles/ManagePhoto.css'

const ManagePhotoModal = ({ isOpen, onClose, onSubmit, date, photo }) => {

    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleDelete = async (e) => {
        try {
            await deletePhoto(date, token);
            alert('Photo deleted successfully!');
        } catch (err) {
            setError(err.response ? err.response.data : 'Delete failed. Please try again.');
        }
    };

    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Manage Photo for {date.toDateString()}</h2>
                <img src={photo} className="photo"/>
                <div className="modal-buttons">
                    <button onClick={handleDelete}>Delete</button>
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

export default ManagePhotoModal;