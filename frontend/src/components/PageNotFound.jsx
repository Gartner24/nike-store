import React from 'react';
import './css/Error404.css';
import logo from '../assets/logo.png';

/**
 * Error404 Component
 * Renders the 404 error page.
 */
const Error404 = () => {
  return (
    <div className='container-error'>
      <h1>404</h1>
      <div className='image'>
        <img src={logo} alt='logo-nike' />
      </div>
      <div className='container-message'>
        <p>Just didn't do it</p>
      </div>
      <div className='container-text'>
        <p>DO IT.</p>
      </div>
    </div>
  );
};

export default Error404;
