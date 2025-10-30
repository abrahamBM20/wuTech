import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategorias } from '../../hooks/useCategorias';
import '../../styles/AdminPanel.css';

const FormularioCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categorias, agregarCategoria, actualizarCategoria } = useCategorias();
  const esEdicion = !!id;

  const [formulario, setFormulario] = useState({
    nombre: '',
    estado: 'Activo'
  });

  useEffect(() => {
    if (esEdicion) {
      const cat = categorias.find(c => c.id === parseInt(id));
      if (cat) {
        setFormulario({ nombre: cat.nombre, estado: cat.estado });
      }
    }
  }, [id, categorias, esEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (esEdicion) {
      actualizarCategoria(parseInt(id), formulario);
    } else {
      agregarCategoria(formulario);
    }
    navigate('/admin/categorias');
  };

  return (
    <div className="admin-container max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/admin/categorias')}
        className="text-blue-600 hover:underline text-sm mb-6"
      >
        ← Volver
      </button>

      <div className="admin-card p-8">
        <h1 className="admin-title text-center mb-8">
          {esEdicion ? 'Editar Categoría' : 'Nueva Categoría'}
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
            <label className="form-label">Nombre de la categoría</label>
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
              {esEdicion ? 'Actualizar' : 'Crear Categoría'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/categorias')}
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

export default FormularioCategoria;