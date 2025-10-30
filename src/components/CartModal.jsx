import React from 'react';
import { useCart } from '../hooks/useCart';

const CartModal = () => {
  const { 
    carrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    finalizarCompra, 
    total,
    showCart,
    setShowCart 
  } = useCart();

  if (!showCart) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Carrito de Compras</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowCart(false)}
            ></button>
          </div>
          <div className="modal-body">
            {carrito.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <>
                <ul className="list-group">
                  {carrito.map((producto, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {producto.nombre} - {new Intl.NumberFormat("es-CL", {
                        style: "currency", 
                        currency: "CLP"
                      }).format(producto.precio)}
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => eliminarDelCarrito(index)}
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
                <h5 className="mt-3">Total: <span id="cart-total">
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency", 
                    currency: "CLP"
                  }).format(total)}
                </span></h5>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={vaciarCarrito}>Vaciar</button>
            <button className="btn btn-success" onClick={finalizarCompra}>Finalizar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;