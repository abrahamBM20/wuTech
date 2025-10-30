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

  // Obtener usuario completo con todos los datos (tarjeta, dirección, etc.)
  const getUsuarioCompleto = (userId) => {
    const users = getUsers();
    return users.find(u => u.id === userId);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Obtener datos completos del usuario
      const usuarioCompleto = getUsuarioCompleto(userData.id);
      if (usuarioCompleto) {
        setUser(usuarioCompleto);
      } else {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = getUsers();
    console.log('🔐 Intentando login con:', { username, password });
    console.log('📋 Usuarios disponibles:', users);
    
    const usuario = users.find(
      u => u.user === username && u.pass === password
    );

    if (usuario) {
      // Guardar usuario completo con todos los datos
      const userData = {
        id: usuario.id,
        user: usuario.user,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        direccion: usuario.direccion,
        tarjeta: usuario.tarjeta
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

  const isAuthenticated = () => {
    return !!user;
  };

  const actualizarUsuario = (nuevosDatos) => {
    const users = getUsers();
    const usuariosActualizados = users.map(u => 
      u.id === user.id ? { ...u, ...nuevosDatos } : u
    );
    
    localStorage.setItem('app_usuarios', JSON.stringify(usuariosActualizados));
    
    const usuarioActualizado = { ...user, ...nuevosDatos };
    setUser(usuarioActualizado);
    localStorage.setItem('user', JSON.stringify(usuarioActualizado));
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    actualizarUsuario,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};