import React, { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { retrievePhoto } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState({});  // Object storing photos keyed by date
    const [missingPhotos, setMissingPhotos] = useState(new Set());  // Track missing photos
    const token = localStorage.getItem('token');

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
                    setPhotos(prev => ({ ...prev, [photoDate]: photoUrl })); // Store the object URL by date
                    console.log(`Photo URL created for ${photoDate}: ${photoUrl}`); // Log created URL
                } else {
                    console.error(`Expected a Blob, but got: ${typeof blob}`);
                }
            } else if (response.status === 404) {
                console.warn(`Photo not found for ${photoDate}.`); // Log missing photo
                setMissingPhotos(prev => new Set(prev).add(photoDate));  // Track missing photo
            } else {
                console.error(`Failed to fetch photo for ${photoDate}: ${response.status} ${response.statusText}`);
                console.error(response);
            }
        } catch (error) {
            console.error('Fetch error:', error);  // Log any network errors
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(date);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Helper to calculate the date from the rowIndex and columnIndex (row: week, col: day of the week)
    const getDateFromIndex = (rowIndex, columnIndex) => {
        const baseDate = new Date();  // Start from the current month
        baseDate.setDate(1);  // Set to the first of the month
        const dayOffset = rowIndex * 7 + columnIndex;  // Calculate the day offset
        baseDate.setDate(baseDate.getDate() + dayOffset);  // Set to the actual day
        return baseDate;
    };

    // Fetch all necessary photos when the component mounts
    useEffect(() => {
        const fetchAllPhotos = () => {
            const daysToFetch = 30; // Number of days to fetch, adjust as needed
            for (let i = 0; i < daysToFetch * 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i); // Get the past days
                const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ''); // Format: YYYYMMDD
                if (!photos[formattedDate] && !missingPhotos.has(formattedDate)) {
                    fetchPhoto(date); // Fetch the photo for the day if not already fetched
                }
            }
        };

        fetchAllPhotos(); // Call the function to fetch photos
    }, []); // Empty dependency array ensures this runs once when the component mounts

    // Handle cell rendering in the grid
    const HandleCellRender = ({ columnIndex, rowIndex, style }) => {
        const day = getDateFromIndex(rowIndex, columnIndex);
        const formattedDate = day?.toISOString().slice(0, 10).replace(/-/g, '');  // Get date in "YYYYMMDD" format
        const photo = photos[formattedDate];

        return (
            <div style={style} key={formattedDate}>
                {photo ? (
                    <img src={photo} alt={`Photo for ${day}`} className="photo" />
                ) : (
                    <div className="placeholder" onClick={() => fetchPhoto(day)}>
                        <span className="date-text">{formatDate(day)}</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <div>
                <h2>Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <Grid
                className="calendar-grid"
                columnCount={7}
                columnWidth={150}
                height={600}
                rowCount={30}  // Estimate of days in the months loaded so far
                rowHeight={150}
                width={1200}
            >
                {HandleCellRender}
            </Grid>
        </div>
    );
};

export default Dashboard;
