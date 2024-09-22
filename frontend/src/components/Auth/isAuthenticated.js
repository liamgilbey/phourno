// function to check for authentication status
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;  // Simple check if token exists
};

export default isAuthenticated;