import React from 'react';
import ProductCard from '../components/ProductCard';
import { productos } from '../data/productos';

const Productos = () => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;