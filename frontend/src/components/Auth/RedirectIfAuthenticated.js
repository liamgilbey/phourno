import { Navigate } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';

const RedirectIfAuthenticated = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

export default RedirectIfAuthenticated;