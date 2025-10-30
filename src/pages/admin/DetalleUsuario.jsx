import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsuarios } from '../../hooks/useUsuarios';
import '../../styles/AdminPanel.css';

const DetalleUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarios } = useUsuarios();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const encontrado = usuarios.find(u => u.id === parseInt(id));
    if (encontrado) setUsuario(encontrado);
    else navigate('/admin/usuarios');
  }, [id, usuarios, navigate]);

  if (!usuario) return null;

  return (
    <div className="admin-container max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin/usuarios')}
        className="text-blue-600 hover:underline text-sm mb-6"
      >
        ← Volver
      </button>

      <div className="admin-card">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-xl">
          <h1 className="text-2xl font-bold">{usuario.nombre}</h1>
          <p className="text-blue-100">{usuario.email}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Información</h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-sm font-medium text-gray-600">ID</dt>
                  <dd className="text-sm">#{usuario.id}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-sm font-medium text-gray-600">Nombre</dt>
                  <dd className="text-sm">{usuario.nombre}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-sm font-medium text-gray-600">Email</dt>
                  <dd className="text-sm">{usuario.email}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cuenta</h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-sm font-medium text-gray-600">Rol</dt>
                  <dd>
                    <span className={`badge ${usuario.rol === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                      {usuario.rol}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-sm font-medium text-gray-600">Estado</dt>
                  <dd>
                    <span className={`badge ${usuario.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}`}>
                      {usuario.estado}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="pt-6 border-t flex gap-3 flex-wrap">
            <Link to={`/admin/editar-usuario/${usuario.id}`} className="btn-primary-admin">
              Editar Usuario
            </Link>
            <button className="btn-primary-admin" style={{ backgroundColor: '#f59e0b', color: 'white' }}>
              Cambiar Contraseña
            </button>
            <button className="btn-primary-admin" style={{ backgroundColor: usuario.estado === 'Activo' ? '#dc2626' : '#10b981', color: 'white' }}>
              {usuario.estado === 'Activo' ? 'Desactivar' : 'Activar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleUsuario;