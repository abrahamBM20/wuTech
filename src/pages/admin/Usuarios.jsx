import React from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import { Link } from 'react-router-dom';
import '../../styles/AdminPanel.css';

const Usuarios = () => {
  const { usuarios, cargando, eliminarUsuario } = useUsuarios();

  if (cargando) {
    return (
      <div className="admin-container text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="admin-title">Lista de Usuarios</h1>
        <Link to="/admin/nuevo-usuario" className="btn-primary-admin">
          + Agregar Usuario
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.rol === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                    {u.rol}
                  </span>
                </td>
                <td>
                  <span className={`badge ${u.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}`}>
                    {u.estado}
                  </span>
                </td>
                <td>
                  <Link to={`/admin/detalle-usuario/${u.id}`} className="btn-action">
                    Ver
                  </Link>
                  <Link to={`/admin/editar-usuario/${u.id}`} className="btn-action">
                    Editar
                  </Link>
                  <button
                    onClick={() => window.confirm(`¿Eliminar a ${u.nombre}?`) && eliminarUsuario(u.id)}
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

export default Usuarios;