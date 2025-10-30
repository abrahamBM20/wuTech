import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { useCart } from '../hooks/useCart';

const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="container-fluid min-vh-100 py-5">
        <div className="container">
          <div className="card shadow p-4 text-center">
            <p>Producto no encontrado</p>
            <Link to="/productos" className="btn btn-secondary">Volver a productos</Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(producto.precio);

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container mt-5">
        <div className="card shadow p-4 text-center">
          <img src={producto.imagen} className="img-fluid mb-3" style={{maxHeight: '300px', objectFit: 'contain'}} alt={producto.nombre} />
          <h2>{producto.nombre}</h2>
          <p className="text-success fw-bold fs-4">{formattedPrice}</p>
          <p className="card-text">{producto.descripcion}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
          <Link to="/productos" className="btn btn-secondary ms-2">Volver</Link>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;