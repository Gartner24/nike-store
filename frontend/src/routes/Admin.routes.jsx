import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Component for handling routing for admin-specific routes.
 * Renders the provided children components if the user is authenticated as an admin,
 * otherwise navigates to the home page.
 * @param {boolean} isAuth - Indicates whether the user is authenticated.
 * @param {string} role - The role of the user.
 * @param {React.ReactNode} children - The child components or elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const AdminRoutes = ({ isAuth, role, children }) => {
  return isAuth && role === 'admin' ? children : <Navigate to='/home' />;
};

export default AdminRoutes;
