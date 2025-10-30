import { useState, useEffect } from 'react';
import { productos as productosIniciales } from '../data/productos';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useProductos: Inicializando...');
    
    const productosGuardados = localStorage.getItem('productos');
    
    if (productosGuardados) {
      console.log('useProductos: Cargando desde localStorage');
      const productosParseados = JSON.parse(productosGuardados);
      setProductos(productosParseados);
    } else {
      console.log('useProductos: Inicializando con datos del JSON');
      // Agregar stock y estado a los productos existentes del JSON
      const productosConStock = productosIniciales.map(producto => ({
        ...producto,
        stock: producto.stock || 10, // Stock por defecto si no existe
        estado: producto.estado || 'activo' // Estado por defecto
      }));
      setProductos(productosConStock);
      localStorage.setItem('productos', JSON.stringify(productosConStock));
    }
    
    setLoading(false);
  }, []);

  const guardarProductos = (nuevosProductos) => {
    console.log('useProductos: Guardando productos', nuevosProductos);
    setProductos(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
  };

  const agregarProducto = (productoData) => {
    const nuevoProducto = {
      ...productoData,
      id: Date.now(),
      estado: 'activo'
    };
    console.log('useProductos: Agregando producto', nuevoProducto);
    const nuevosProductos = [...productos, nuevoProducto];
    guardarProductos(nuevosProductos);
    return nuevoProducto;
  };

  const editarProducto = (id, productoData) => {
    console.log('useProductos: Editando producto', id, productoData);
    const productosActualizados = productos.map(producto =>
      producto.id === id ? { ...producto, ...productoData } : producto
    );
    guardarProductos(productosActualizados);
  };

  const eliminarProducto = (id) => {
    console.log('useProductos: Eliminando producto', id);
    const productosFiltrados = productos.filter(producto => producto.id !== id);
    guardarProductos(productosFiltrados);
  };

  const obtenerProductoPorId = (id) => {
    const producto = productos.find(producto => producto.id === parseInt(id));
    console.log('useProductos: Buscando producto', id, 'encontrado:', producto);
    return producto;
  };

  return {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductoPorId,
    loading
  };
};