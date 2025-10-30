import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import LogoutButton from './LogoutButton';

const Header = ({ onMostrarCheckout }) => {
  const { carrito, setShowCart } = useCart();
  const { user } = useAuth();

  const handleVerCarrito = () => {
    setShowCart(true);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <img src="/img/logo.png" alt="WU-TECH" width="70" height="70" />
          <Link className="navbar-brand" to="/"></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#contenidoNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="contenidoNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/servicios">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blogs</Link>
              </li>
              
              {user?.rol === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link text-warning fw-bold" to="/admin">
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center gap-3">
              <button 
                className="btn btn-outline-primary position-relative"
                onClick={handleVerCarrito}
              >
                Ver Carrito
                {carrito.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carrito.length}
                  </span>
                )}
              </button>
              
              {/* Mostrar usuario logueado */}
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Hola,</span>
                  <span className="fw-semibold">{user.nombre}</span>
                  <LogoutButton />
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <Link to="/registro">
                    <button className="btn btn-outline-success">Registrarse</button>
                  </Link>
                  <Link to="/iniciar-sesion">
                    <button className="btn btn-primary">Iniciar sesión</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;