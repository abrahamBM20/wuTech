import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsuarios } from '../../hooks/useUsuarios';
import '../../styles/AdminPanel.css';

const FormularioUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarios, agregarUsuario, actualizarUsuario } = useUsuarios();
  const esEdicion = !!id;

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    estado: 'Activo'
  });

  useEffect(() => {
    if (esEdicion) {
      const usuario = usuarios.find(u => u.id === parseInt(id));
      if (usuario) {
        setFormulario({
          nombre: usuario.nombre,
          email: usuario.email,
          password: '',
          rol: usuario.rol,
          estado: usuario.estado
        });
      }
    }
  }, [id, usuarios, esEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (esEdicion) {
      actualizarUsuario(parseInt(id), formulario);
    } else {
      if (!formulario.password) {
        alert('La contraseña es obligatoria');
        return;
      }
      agregarUsuario(formulario);
    }
    navigate('/admin/usuarios');
  };

  return (
    <div className="admin-container max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/admin/usuarios')}
        className="text-blue-600 hover:underline text-sm mb-6"
      >
        ← Volver
      </button>

      <div className="admin-card p-8">
        <h1 className="admin-title text-center mb-8">
          {esEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formulario.nombre}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="form-label">Nombre completo</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              className="form-control"
              value={formulario.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="form-label">Correo electrónico</label>
          </div>

          {!esEdicion && (
            <div className="input-group">
              <input
                type="password"
                name="password"
                className="form-control"
                value={formulario.password}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label className="form-label">Contraseña</label>
            </div>
          )}

          <div className="input-group">
            <select
              name="rol"
              className="form-control"
              value={formulario.rol}
              onChange={handleChange}
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
            <label className="form-label">Rol</label>
          </div>

          <div className="input-group">
            <select
              name="estado"
              className="form-control"
              value={formulario.estado}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <label className="form-label">Estado</label>
          </div>

          <div className="flex justify-center gap-4 pt-6">
            <button type="submit" className="btn-form">
              {esEdicion ? 'Actualizar' : 'Crear Usuario'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/usuarios')}
              className="btn-form btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioUsuario;