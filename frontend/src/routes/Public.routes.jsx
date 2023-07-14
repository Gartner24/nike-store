import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Component for handling public routes.
 * Renders the provided children components if the user is not authenticated,
 * otherwise navigates to the home page.
 * @param {boolean} isAuth - Indicates whether the user is authenticated.
 * @param {React.ReactNode} children - The child components or elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const PublicRoutes = ({ isAuth, children }) => {
  return !isAuth ? children : <Navigate to="/home" />;
};

export default PublicRoutes;
