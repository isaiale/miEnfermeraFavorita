import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Recuperar la información del usuario desde localStorage al cargar la página
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  const login = (user) => {
    setUser(user);
    setIsAuthenticated(true);

    // Guardar la información del usuario en localStorage al iniciar sesión
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Limpiar la información del usuario en localStorage al cerrar sesión
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('fotoPerfil');
  };

  const authContextData = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
