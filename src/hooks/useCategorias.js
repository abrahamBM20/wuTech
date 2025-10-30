import { useState, useEffect } from 'react';

const categoriasIniciales = [
  { id: 1, nombre: 'Tarjetas Gráficas', estado: 'Activo' },
  { id: 2, nombre: 'Procesadores AMD', estado: 'Activo' },
  { id: 3, nombre: 'Procesadores Intel', estado: 'Activo' },
  { id: 4, nombre: 'Memoria RAM', estado: 'Activo' },
  { id: 5, nombre: 'Gabinetes', estado: 'Activo' },
  { id: 6, nombre: 'Componentes', estado: 'Activo' }
];

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardadas = localStorage.getItem('categorias');
    if (guardadas) {
      setCategorias(JSON.parse(guardadas));
    } else {
      localStorage.setItem('categorias', JSON.stringify(categoriasIniciales));
      setCategorias(categoriasIniciales);
    }
    setCargando(false);
  }, []);

  const agregarCategoria = (nueva) => {
    const conId = { ...nueva, id: Date.now() };
    const nuevas = [...categorias, conId];
    setCategorias(nuevas);
    localStorage.setItem('categorias', JSON.stringify(nuevas));
  };

  const actualizarCategoria = (id, datos) => {
    const nuevas = categorias.map(c => c.id === id ? { ...c, ...datos } : c);
    setCategorias(nuevas);
    localStorage.setItem('categorias', JSON.stringify(nuevas));
  };

  const eliminarCategoria = (id) => {
    const nuevas = categorias.filter(c => c.id !== id);
    setCategorias(nuevas);
    localStorage.setItem('categorias', JSON.stringify(nuevas));
  };

  return { categorias, cargando, agregarCategoria, actualizarCategoria, eliminarCategoria };
};