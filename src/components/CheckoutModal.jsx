
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const CheckoutModal = ({ onClose }) => {
  const { vaciarCarrito, total } = useCart();
  const { usuarioActual } = useAuth();
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    if (usuarioActual?.direccion) {
      setDireccion(usuarioActual.direccion);
    }
  }, [usuarioActual]);

  const validarPago = () => {
    if (!usuarioActual?.tarjeta?.valida) {
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

    // Guardar dirección
    const usuariosActualizados = JSON.parse(localStorage.getItem('usuarios') || '[]')
      .map(u => u.id === usuarioActual.id ? { ...u, direccion } : u);
    
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    localStorage.setItem('usuarioActual', JSON.stringify({ ...usuarioActual, direccion }));

    alert(`¡Compra exitosa!\nPago aprobado con tarjeta terminada en ${usuarioActual.tarjeta.numero.slice(-4)}\nDirección: ${direccion}`);
    vaciarCarrito();
    onClose(); // ← Cierra todo
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Finalizar Compra</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose} // ← FUNCIONA
              disabled={procesando}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="text-center mb-3">
                <p><strong>{usuarioActual?.nombre}</strong></p>
                <p className="text-muted">{usuarioActual?.email}</p>
              </div>

              <div className="card border-primary mb-3">
                <div className="card-body">
                  <p className="mb-1"><strong>Tarjeta:</strong> {usuarioActual?.tarjeta?.numero}</p>
                  <p className="mb-1"><strong>Titular:</strong> {usuarioActual?.tarjeta?.titular}</p>
                  <p className="mb-0"><strong>Expira:</strong> {usuarioActual?.tarjeta?.expiracion}</p>
                  <small className={`text-${usuarioActual?.tarjeta?.valida ? 'success' : 'danger'} fw-bold`}>
                    {usuarioActual?.tarjeta?.valida ? 'Tarjeta válida' : 'Fondos insuficientes'}
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
                onClick={onClose} // ← Cierra con botón
                disabled={procesando}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-success" 
                disabled={procesando || !usuarioActual?.tarjeta?.valida}
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