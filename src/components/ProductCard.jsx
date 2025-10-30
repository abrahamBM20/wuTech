import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useCategorias } from '../hooks/useCategorias';

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();
  const { categorias } = useCategorias();

  const categoria = categorias.find(c => c.id === producto.categoriaId);
  const nombreCategoria = categoria ? categoria.nombre : 'Sin categoría';

  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(producto.precio);

  return (
    <div className="card h-100 shadow-sm">
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      <div className="card-body text-center">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="text-muted small mb-1">Categoría: {nombreCategoria}</p>
        <p className="card-text text-success fw-bold">{formattedPrice}</p>
        <Link to={`/producto/${producto.id}`} className="btn btn-secondary me-2">Ver más</Link>
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;