import React, { createContext, useState, useEffect } from 'react';
import parseJwt from '../helpers/parseJwt.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Actualizar el estado global cuando se detecte un cambio en isAuthenticated o isAdmin
    setUserData(null);
    // Lógica para verificar el estado del usuario y asignar valores a isAuthenticated, isAdmin y userData
  }, [isAuthenticated, isAdmin]);

  const checkTokenValidity = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Enviar solicitud fetch para obtener la información del usuario
      fetch('http://localhost:8080/api/ping', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const user = data[0];
            setIsAdmin(user.role === 'admin');
            setUserData(user);
            setIsAuthenticated(true);
          } else {
            setIsAdmin(false);
            setUserData(null);
            setIsAuthenticated(false);
          }
        })
        .catch(error => {
          setIsAdmin(false);
          setUserData(null);
          setIsAuthenticated(false);
          console.error('Error:', error);
        });
    } else {
      setIsAdmin(false);
      setUserData(null);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    // Limpiar los datos del usuario y cerrar sesión
    localStorage.removeItem('token');
    setIsAdmin(false);
    setUserData(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const value = {
    isAuthenticated,
    isAdmin,
    userData,
    checkTokenValidity,
    handleLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
