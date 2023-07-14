import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://nike-fake-store.onrender.com/api/ping", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const user = data[0];
            setIsAdmin(user.role === "admin");
            setUserData(user);
            setIsAuthenticated(true);
          } else {
            setIsAdmin(false);
            setUserData(null);
            setIsAuthenticated(false);
          }
        } else {
          setIsAdmin(false);
          setUserData(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAdmin(false);
        setUserData(null);
        setIsAuthenticated(false);
        console.error("Error:", error);
      }
    } else {
      setIsAdmin(false);
      setUserData(null);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
