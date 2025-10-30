import React from 'react';
import { Link } from 'react-router-dom';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useCategorias } from '../../hooks/useCategorias';
import { FaUsers, FaTags, FaWrench, FaLaptop, FaCode } from 'react-icons/fa';
import '../../styles/AdminPanel.css';

const Dashboard = () => {
  const { usuarios } = useUsuarios();
  const { categorias } = useCategorias();

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      <div className="row g-4">
        {/* Usuarios */}
        <div className="col-md-4">
          <div className="service-card">
            <div className="service-icon">
              <FaUsers />
            </div>
            <h3>Gestión de Usuarios</h3>
            <p>Administra roles, permisos y cuentas de usuarios.</p>
            <Link to="/admin/usuarios" className="btn-service">
              Gestionar Usuarios
            </Link>
          </div>
        </div>

        {/* Categorías */}
        <div className="col-md-4">
          <div className="service-card">
            <div className="service-icon">
              <FaTags />
            </div>
            <h3>Gestión de Categorías</h3>
            <p>Organiza productos por categorías.</p>
            <Link to="/admin/categorias" className="btn-service">
              Gestionar Categorías
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>¿Listo para optimizar tu tienda?</h2>
        <p className="text-muted">Administra todo desde un solo lugar.</p>
        <div className="mt-4">
          <Link to="/admin/usuarios" className="btn-service me-3">
            Ir a Usuarios
          </Link>
          <Link to="/admin/categorias" className="btn-service">
            Ir a Categorías
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;