import { useState, useEffect, useContext, createContext } from 'react';
import { users } from '../data/users';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const usuario = users.find(
      u => u.user === username && u.pass === password
    );

    if (usuario) {
      const userData = {
        id: usuario.id,
        user: usuario.user,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // La redirección se manejará en los componentes que usen logout
  };

  const isAdmin = () => {
    return user?.rol === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};