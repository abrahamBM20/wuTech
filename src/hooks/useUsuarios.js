import { useState, useEffect } from 'react';
import { users } from '../data/users';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar usuarios desde localStorage o usar los datos iniciales
  useEffect(() => {
    setTimeout(() => {
      const usuariosGuardados = localStorage.getItem('usuarios_wutech');
      
      if (usuariosGuardados) {
        // Si hay usuarios guardados en localStorage, usarlos
        setUsuarios(JSON.parse(usuariosGuardados));
      } else {
        // Si no hay usuarios guardados, usar los datos iniciales y guardarlos
        const usuariosTransformados = users.map(user => ({
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
          estado: 'Activo',
          // Mantener las propiedades originales para autenticación
          user: user.user,
          pass: user.pass
        }));
        
        setUsuarios(usuariosTransformados);
        localStorage.setItem('usuarios_wutech', JSON.stringify(usuariosTransformados));
      }
      
      setCargando(false);
    }, 600);
  }, []);

  // Función para guardar en localStorage
  const guardarUsuarios = (nuevosUsuarios) => {
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios_wutech', JSON.stringify(nuevosUsuarios));
  };

  const agregarUsuario = (nuevo) => {
    const conId = { 
      ...nuevo, 
      id: Date.now(),
      estado: 'Activo' // Agregar estado por defecto
    };
    const nuevosUsuarios = [...usuarios, conId];
    guardarUsuarios(nuevosUsuarios);
    return conId;
  };

  const actualizarUsuario = (id, datos) => {
    const nuevosUsuarios = usuarios.map(u => 
      u.id === id ? { ...u, ...datos } : u
    );
    guardarUsuarios(nuevosUsuarios);
  };

  const eliminarUsuario = (id) => {
    const nuevosUsuarios = usuarios.filter(u => u.id !== id);
    guardarUsuarios(nuevosUsuarios);
  };

  // Función para resetear a los usuarios originales (útil para testing)
  const resetearUsuarios = () => {
    const usuariosTransformados = users.map(user => ({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      estado: 'Activo',
      user: user.user,
      pass: user.pass
    }));
    
    guardarUsuarios(usuariosTransformados);
  };

  return {
    usuarios,
    cargando,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    resetearUsuarios
  };
};