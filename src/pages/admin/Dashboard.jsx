import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaTags, FaLaptop, FaChartBar } from 'react-icons/fa';
import '../../styles/AdminPanel.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalCategorias: 0,
    totalProductos: 0
  });

  useEffect(() => {
    // Cargar estadísticas básicas desde localStorage
    try {
      const usuarios = JSON.parse(localStorage.getItem('app_usuarios') || '[]');
      const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
      const productos = JSON.parse(localStorage.getItem('productos') || '[]');

      setStats({
        totalUsuarios: usuarios.length,
        totalCategorias: categorias.length,
        totalProductos: productos.length
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      {/* Estadísticas rápidas */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalUsuarios}</h3>
              <p>Usuarios Registrados</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <FaTags className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalCategorias}</h3>
              <p>Categorías Activas</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <FaLaptop className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalProductos}</h3>
              <p>Productos en Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos de gestión */}
      <div className="row g-4">
        {/* Gestión de Usuarios */}
        <div className="col-md-4">
          <div className="service-card">
            <div className="service-icon">
              <FaUsers />
            </div>
            <h3>Gestión de Usuarios</h3>
            <p>Administra roles, permisos y cuentas de usuarios del sistema.</p>
            <Link to="/admin/usuarios" className="btn-service">
              Gestionar Usuarios
            </Link>
          </div>
        </div>

        {/* Gestión de Categorías */}
        <div className="col-md-4">
          <div className="service-card">
            <div className="service-icon">
              <FaTags />
            </div>
            <h3>Gestión de Categorías</h3>
            <p>Organiza y gestiona las categorías de productos de la tienda.</p>
            <Link to="/admin/categorias" className="btn-service">
              Gestionar Categorías
            </Link>
          </div>
        </div>

        {/* Gestión de Productos */}
        <div className="col-md-4">
          <div className="service-card">
            <div className="service-icon">
              <FaLaptop />
            </div>
            <h3>Gestión de Productos</h3>
            <p>Administra el inventario completo de productos y servicios.</p>
            <Link to="/admin/productos" className="btn-service">
              Gestionar Productos
            </Link>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="text-center mt-5">
        <h2>¿Listo para optimizar tu tienda?</h2>
        <p className="text-muted">Administra todos los aspectos de tu e-commerce desde un solo lugar.</p>
        <div className="mt-4">
          <Link to="/admin/usuarios" className="btn-service me-3">
            <FaUsers className="me-2" />
            Usuarios
          </Link>
          <Link to="/admin/categorias" className="btn-service me-3">
            <FaTags className="me-2" />
            Categorías
          </Link>
          <Link to="/admin/productos" className="btn-service">
            <FaLaptop className="me-2" />
            Productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;