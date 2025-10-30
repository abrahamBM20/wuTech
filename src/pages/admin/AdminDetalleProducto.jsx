import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductos } from '../../hooks/useProductos';
import { useCategorias } from '../../hooks/useCategorias';

const AdminDetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProductoPorId, eliminarProducto } = useProductos();
  const { categorias } = useCategorias();

  const producto = obtenerProductoPorId(id);

  if (!producto) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Producto no encontrado</div>
        <Link to="/admin/productos" className="btn btn-primary">Volver</Link>
      </div>
    );
  }

  const categoria = categorias.find(c => c.id === producto.categoriaId);
  const nombreCategoria = categoria ? categoria.nombre : 'Sin categoría';

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const handleEliminar = () => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}"?`)) {
      eliminarProducto(producto.id);
      navigate('/admin/productos');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">👁️ Detalle del Producto</h4>
              <div className="btn-group">
                <Link 
                  to={`/admin/productos/editar/${producto.id}`}
                  className="btn btn-warning btn-sm"
                >
                  ✏️ Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleEliminar}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8">
                  <h3 className="text-primary">{producto.nombre}</h3>
                  <p className="text-muted">{producto.descripcion}</p>
                  
                  <div className="row mt-4">
                    <div className="col-6">
                      <strong>Precio:</strong>
                      <br />
                      <span className="h4 text-success">{formatearPrecio(producto.precio)}</span>
                    </div>
                    <div className="col-6">
                      <strong>Stock disponible:</strong>
                      <br />
                      <span className={`h4 ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                        {producto.stock} unidades
                      </span>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6">
                      <strong>Categoría:</strong>
                      <br />
                      <span className="badge bg-secondary fs-6">{nombreCategoria}</span>
                    </div>
                    <div className="col-6">
                      <strong>Estado:</strong>
                      <br />
                      <span className={`badge ${producto.estado === 'activo' ? 'bg-success' : 'bg-secondary'} fs-6`}>
                        {producto.estado}
                      </span>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12">
                      <strong>ID del producto:</strong>
                      <br />
                      <code>{producto.id}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/admin/productos" className="btn btn-primary">
                ↩️ Volver a la lista
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminDetalleProducto;