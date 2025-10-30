import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import CheckoutModal from './CheckoutModal';

const CartModal = ({ onMostrarCheckout }) => {
  const { 
    carrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    total,
    showCart,
    setShowCart 
  } = useCart();

  const { user, isAuthenticated } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleFinalizarCompra = () => {
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para comprar');
      setShowCart(false);
      // Usar navigate en lugar de window.location para mejor experiencia
      window.location.href = '/iniciar-sesion';
      return;
    }
    
    if (!user?.tarjeta) {
      alert('No tienes una tarjeta configurada. Contacta al administrador.');
      return;
    }

    setShowCheckout(true);
  };

  const handleCerrarTodo = () => {
    setShowCheckout(false);
    setShowCart(false);
  };

  if (!showCart) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
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
                <p className="text-center">El carrito está vacío</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {carrito.map((producto, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{producto.nombre}</strong><br/>
                          <small>{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}</small>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => eliminarDelCarrito(index)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="text-end">
                    <h5>Total: {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(total)}</h5>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline-danger" 
                onClick={vaciarCarrito}
                disabled={carrito.length === 0}
              >
                Vaciar Carrito
              </button>
              <button 
                className="btn btn-success" 
                onClick={handleFinalizarCompra}
                disabled={carrito.length === 0}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && isAuthenticated() && (
        <CheckoutModal onClose={handleCerrarTodo} />
      )}
    </>
  );
};

export default CartModal;