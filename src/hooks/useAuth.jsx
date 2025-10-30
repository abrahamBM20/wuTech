import { createContext, useContext, useState } from 'react';
import { users } from '../data/users';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem('usuarioActual');
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = (user, pass) => {
    const usuario = users.find(u => u.user === user && u.pass === pass);
    
    if (usuario) {
      const { pass, ...usuarioSinPass } = usuario;
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioSinPass));
      setUsuarioActual(usuarioSinPass);
      return { success: true, user: usuarioSinPass };
    } else {
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
  };

  const logout = () => {
    localStorage.removeItem('usuarioActual');
    setUsuarioActual(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioActual, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};