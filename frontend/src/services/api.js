import axios from 'axios';

const API_URL = 'http://localhost:8080';  // Replace with your backend URL

export const apiHealthcheck = () => {
    return axios.get(`${API_URL}/healthcheck`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

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

export const verifyAuth = (token) => {
    return axios.get(`${API_URL}/verify-auth`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const retrievePhoto = (photoDate, token) => {
    return axios.get(`${API_URL}/photo/${photoDate}`, {
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const retreiveThumbnail = (photoDate, token) => {
    return axios.get(`${API_URL}/thumbnail/${photoDate}`, {
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const deletePhoto = (photoDate, token) => {
    return axios.delete(`${API_URL}/delete/${photoDate}`, {
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}