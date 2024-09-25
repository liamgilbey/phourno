import { verifyAuth } from '../../services/api';

export const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) return false;

    try {
        const response = await verifyAuth(token);

        return response.data.valid;  // Return true if the backend says the token is valid
    } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem('token');  // Remove invalid or expired token
        return false;
    }
};

export default isAuthenticated;