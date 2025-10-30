import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ onClose }) => {
  const { vaciarCarrito, total } = useCart();
  const { user, isAuthenticated, actualizarUsuario } = useAuth();
  const navigate = useNavigate();
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');
  const [procesando, setProcesando] = useState(false);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      onClose();
      navigate('/iniciar-sesion');
      return;
    }
  }, [isAuthenticated, navigate, onClose]);

  // Cargar dirección si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated() && user?.direccion) {
      setDireccion(user.direccion);
    }
  }, [user, isAuthenticated]);

  const validarPago = () => {
    if (!user?.tarjeta?.valida) {
      return { success: false, error: "Fondos insuficientes. Tarjeta rechazada." };
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProcesando(true);

    if (!direccion.trim()) {
      setError('La dirección es obligatoria');
      setProcesando(false);
      return;
    }

    const pago = await validarPago();
    if (!pago.success) {
      setError(pago.error);
      setProcesando(false);
      return;
    }

    // Actualizar dirección del usuario
    actualizarUsuario({ direccion });

    alert(`¡Compra exitosa!\nPago aprobado con tarjeta terminada en ${user.tarjeta.numero.slice(-4)}\nDirección: ${direccion}`);
    vaciarCarrito();
    onClose();
  };

  // No renderizar si no está autenticado
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Finalizar Compra</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              disabled={procesando}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="text-center mb-3">
                <p><strong>{user?.nombre}</strong></p>
                <p className="text-muted">{user?.email}</p>
              </div>

              <div className="card border-primary mb-3">
                <div className="card-body">
                  <p className="mb-1"><strong>Tarjeta:</strong> {user?.tarjeta?.numero}</p>
                  <p className="mb-1"><strong>Titular:</strong> {user?.tarjeta?.titular}</p>
                  <p className="mb-0"><strong>Expira:</strong> {user?.tarjeta?.expiracion}</p>
                  <small className={`text-${user?.tarjeta?.valida ? 'success' : 'danger'} fw-bold`}>
                    {user?.tarjeta?.valida ? 'Tarjeta válida' : 'Fondos insuficientes'}
                  </small>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección de envío</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Calle Falsa 123, Depto 45, Santiago"
                  required
                  disabled={procesando}
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="text-end">
                <strong>Total: </strong>
                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(total)}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={onClose}
                disabled={procesando}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-success" 
                disabled={procesando || !user?.tarjeta?.valida}
              >
                {procesando ? 'Procesando pago...' : 'Confirmar Compra'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;