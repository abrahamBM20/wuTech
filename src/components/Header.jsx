
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import LogoutButton from './LogoutButton';

const Header = () => {
  const { carrito, setShowCart } = useCart();
  const { user } = useAuth();

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
              {/* Enlace al Dashboard para administradores */}
              {user?.rol === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/admin">
                    🛠️ Admin Panel
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-primary me-3" 
                onClick={() => setShowCart(true)}
              >
                🛒 Ver Carrito {carrito.length > 0 && `(${carrito.length})`}
              </button>
              
              {/* Mostrar diferentes botones según si el usuario está autenticado o no */}
              {user ? (
                <div className="d-flex align-items-center">
                  <span className="me-3 text-muted">Hola, {user.nombre}</span>
                  <LogoutButton />
                </div>
              ) : (
                <div className="btn-group-responsive">
                  <Link to="/registro">
                    <button className="btn btn-outline-primary me-2">Registrarse</button>
                  </Link>
                  <Link to="/iniciar-sesion">
                    <button className="btn btn-outline-primary">Iniciar sesión</button>
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