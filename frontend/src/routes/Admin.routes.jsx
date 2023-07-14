import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({ isAuth, role, children }) => {
    return isAuth && role === 'admin' ? children : <Navigate to='/home' />;
};

export default AdminRoutes;
