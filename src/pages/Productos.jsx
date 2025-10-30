import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProductos } from '../hooks/useProductos';

const Productos = () => {
  const { productos, loading } = useProductos();

  if (loading) {
    return (
      <div className="container-fluid min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando productos...</span>
              </div>
              <p className="mt-2">Cargando productos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="row g-4">
                  {productos.map(producto => (
                    <div key={producto.id} className="col-md-4">
                      <ProductCard producto={producto} />
                    </div>
                  ))}
                </div>
                
                {productos.length === 0 && (
                  <div className="text-center py-5">
                    <h4 className="text-muted">No hay productos disponibles</h4>
                    <p>Agrega productos desde el panel de administración</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;