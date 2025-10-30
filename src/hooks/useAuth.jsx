import { useState, useEffect, useContext, createContext } from 'react';
import { users as initialUsers } from '../data/users';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // MISMA función para obtener usuarios que useUsuarios.js
  const getUsers = () => {
    const storedUsers = localStorage.getItem('app_usuarios');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // Si no hay en localStorage, usar los de users.jsx
    return initialUsers;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = getUsers(); // Usar MISMA fuente de datos
    console.log('🔐 Intentando login con:', { username, password });
    console.log('📋 Usuarios disponibles:', users);
    
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
      console.log('✅ Login exitoso:', userData);
      return { success: true, user: userData };
    } else {
      console.log('❌ Login fallido - Usuario no encontrado');
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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