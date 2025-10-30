import React from 'react';
import { Link } from 'react-router-dom';
import { useCategorias } from '../../hooks/useCategorias';
import '../../styles/AdminPanel.css';

const Categorias = () => {
  const { categorias, cargando, eliminarCategoria } = useCategorias();

  if (cargando) {
    return (
      <div className="admin-container text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="admin-title">Gestión de Categorías</h1>
        <Link to="/admin/categorias/nueva" className="btn-primary-admin">
          + Nueva Categoría
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(cat => (
              <tr key={cat.id}>
                <td>{cat.nombre}</td>
                <td>
                  <span className={`badge ${cat.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}`}>
                    {cat.estado}
                  </span>
                </td>
                <td>
                  <Link to={`/admin/categorias/editar/${cat.id}`} className="btn-action">
                    Editar
                  </Link>
                  <button
                    onClick={() => window.confirm(`¿Eliminar ${cat.nombre}?`) && eliminarCategoria(cat.id)}
                    className="btn-action btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorias;