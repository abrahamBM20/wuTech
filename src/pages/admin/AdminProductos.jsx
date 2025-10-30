import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../../hooks/useProductos';
import { useCategorias } from '../../hooks/useCategorias';

const AdminProductos = () => {
  const { productos, eliminarProducto } = useProductos();
  const { categorias } = useCategorias();
  const [filtro, setFiltro] = useState('');

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  const obtenerNombreCategoria = (categoriaId) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
      eliminarProducto(id);
    }
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          ➕ Agregar Producto
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map(producto => (
                  <tr key={producto.id}>
                    <td>
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    </td>
                    <td>
                      <strong>{producto.nombre}</strong>
                      <br />
                      <small className="text-muted">{producto.descripcion.substring(0, 50)}...</small>
                    </td>
                    <td className="fw-bold text-success">{formatearPrecio(producto.precio)}</td>
                    <td>
                      <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {producto.stock} unidades
                      </span>
                    </td>
                    <td>{obtenerNombreCategoria(producto.categoriaId)}</td>
                    <td>
                      <span className={`badge ${producto.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>
                        {producto.estado}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Link 
                          to={`/admin/productos/editar/${producto.id}`}
                          className="btn btn-outline-warning"
                        >
                          ✏️
                        </Link>
                        <Link 
                          to={`/admin/productos/detalle/${producto.id}`}
                          className="btn btn-outline-info"
                        >
                          👁️
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleEliminar(producto.id, producto.nombre)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productosFiltrados.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default AdminProductos;