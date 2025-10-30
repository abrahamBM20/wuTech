
import { useState, useEffect } from 'react';
import { users as usuariosIniciales } from '../data/users';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardados = localStorage.getItem('usuarios');
    
    if (guardados) {
      try {
        setUsuarios(JSON.parse(guardados));
      } catch (e) {
        console.error("Error parsing usuarios:", e);
        setUsuarios(usuariosIniciales);
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
      }
    } else {
      setUsuarios(usuariosIniciales);
      localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
    }
    
    setCargando(false);
  }, []);

  const eliminarUsuario = (id) => {
    const nuevos = usuarios.filter(u => u.id !== id);
    setUsuarios(nuevos);
    localStorage.setItem('usuarios', JSON.stringify(nuevos));
  };

  return {
    usuarios,
    cargando,
    eliminarUsuario
  };
};