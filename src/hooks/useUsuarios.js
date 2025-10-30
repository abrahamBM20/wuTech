import { useState, useEffect } from 'react';
import { users as initialUsers } from '../data/users';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = localStorage.getItem('app_usuarios');
      
      console.log('🔍 useUsuarios: Verificando localStorage...');
      
      if (storedUsers) {
        console.log('✅ useUsuarios: Cargando desde localStorage');
        setUsuarios(JSON.parse(storedUsers));
      } else {
        console.log('🔄 useUsuarios: Inicializando con datos de users.jsx');
        // FORZAR la carga de usuarios iniciales
        setUsuarios(initialUsers);
        localStorage.setItem('app_usuarios', JSON.stringify(initialUsers));
        console.log('✅ useUsuarios: Usuarios guardados en localStorage');
      }
      setCargando(false);
    };

    loadUsers();
  }, []);

  // ... el resto del código igual
  const generarIdSecuencial = () => {
    if (usuarios.length === 0) return 3;
    const maxId = usuarios.reduce((max, usuario) => 
      usuario.id > max ? usuario.id : max, 0
    );
    return maxId + 1;
  };

  const agregarUsuario = (userData) => {
    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.find(u => 
      u.user === userData.username || u.email === userData.correo
    );

    if (usuarioExistente) {
      throw new Error('El usuario o email ya están registrados');
    }

    const nuevoUsuario = {
      id: generarIdSecuencial(),
      user: userData.username,
      pass: userData.pass,
      nombre: userData.nombre,
      email: userData.correo,
      rol: 'cliente',
      estado: 'Activo',
      tarjeta: ""
    };

    const nuevosUsuarios = [...usuarios, nuevoUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('app_usuarios', JSON.stringify(nuevosUsuarios));
    
    console.log('=== USUARIO AÑADIDO AL JSON ===');
    console.log('Nuevo usuario registrado:', nuevoUsuario);
    console.log('--- LISTA COMPLETA DE USUARIOS ---');
    nuevosUsuarios.forEach((usuario, index) => {
      console.log(`Usuario ${index + 1}:`, usuario);
    });
    console.log(`Total de usuarios: ${nuevosUsuarios.length}`);
    console.log('================================');
    
    return nuevoUsuario;
  };

  const eliminarUsuario = (id) => {
    const nuevosUsuarios = usuarios.filter(u => u.id !== id);
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('app_usuarios', JSON.stringify(nuevosUsuarios));
    console.log(`🗑️ Usuario con ID ${id} eliminado`);
  };

  const actualizarUsuario = (id, datosActualizados) => {
    const nuevosUsuarios = usuarios.map(u => 
      u.id === id ? { ...u, ...datosActualizados } : u
    );
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('app_usuarios', JSON.stringify(nuevosUsuarios));
  };

  return {
    usuarios,
    cargando,
    agregarUsuario,
    eliminarUsuario,    
    actualizarUsuario
  };
};