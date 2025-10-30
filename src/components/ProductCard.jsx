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
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="text-muted small mb-1">Categoría: {nombreCategoria}</p>
        <p className="card-text text-success fw-bold">{formattedPrice}</p>
        
        {/* Mostrar stock */}
        <div className="mb-2">
          <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
            {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
          </span>
        </div>

        <div className="mt-auto">
          <Link to={`/producto/${producto.id}`} className="btn btn-secondary me-2 w-100 mb-2">
            Ver más
          </Link>
          <button 
            className="btn btn-primary w-100" 
            onClick={() => addToCart(producto)}
            disabled={producto.stock === 0}
          >
            {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;