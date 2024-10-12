import React, { useState, useEffect } from 'react';
import { deletePhoto } from '../../services/api';
import { retrievePhoto } from '../../services/api';
import '../../styles/ManagePhoto.css'

const ManagePhotoModal = ({ isOpen, onClose, onSubmit, date, photo }) => {

    const [photoURL, setPhotoURL] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // handle photo deletion
    const handleDelete = async (e) => {
        e.preventDefault();
        const photoDate = date.toISOString().slice(0, 10);
        try {
            const response = await deletePhoto(photoDate, token);
            console.log(response)
            alert('Photo deleted successfully!');
        } catch (err) {
            setError(err.response ? err.response.data : 'Delete failed. Please try again.');
        }
    };

    // Function to fetch a photo for a specific day
    const fetchPhoto = async (date) => {
        const photoDate = date.toISOString().slice(0, 10).replace(/-/g, '');  // Format: YYYYMMDD
        try {
            const response = await retrievePhoto(photoDate, token);
            console.log(`Response Status: ${photoDate} - ${response.status} - ${response.statusText}`);

            if (response.status === 200) {
                const blob = await response.data;
                if (blob instanceof Blob) { // Check if it's indeed a Blob
                    const photoUrl = URL.createObjectURL(blob); // Create an object URL for the blob
                    setPhotoURL(photoUrl); // Store the object URL by date
                } else {
                    console.error(`Expected a Blob, but got: ${typeof blob}`);
                }
            } else if (response.status === 404) {
                console.warn(`Photo not found for ${photoDate}.`); // Log missing photo
            } else {
                console.error(`Failed to fetch photo for ${photoDate}: ${response.status} ${response.statusText}`);
                console.error(response);
            }
        } catch (error) {
            console.error('Fetch error:', error);  // Log any network errors
        }
    };    

    // Use useEffect to fetch photo when the modal opens
    useEffect(() => {
        if (isOpen && date) {
            fetchPhoto(date);  // Call fetchPhoto when modal opens and date is provided
        }
    }, [isOpen, date]);  // Dependency array: run this effect when isOpen or date changes


    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Manage Photo for {date.toDateString()}</h2>
                <div className="modal-body">
                    <div className="photo-container">
                        <a href={photoURL}><img src={photoURL} alt="Fetched" className="photo" /></a>
                    </div>
                    <div className="modal-buttons">
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
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