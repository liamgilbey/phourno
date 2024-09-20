import axios from 'axios';

const API_URL = 'http://localhost:8080';  // Replace with your backend URL

export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const login = (userData) => {
    return axios.post(`${API_URL}/login`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const uploadPhoto = (photoData, token) => {
    return axios.post(`${API_URL}/upload`, photoData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};
