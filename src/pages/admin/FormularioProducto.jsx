import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductos } from '../../hooks/useProductos';
import { useCategorias } from '../../hooks/useCategorias';

const FormularioProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { productos, agregarProducto, editarProducto, obtenerProductoPorId } = useProductos();
  const { categorias } = useCategorias();
  
  const esEdicion = Boolean(id);
  const productoEditar = esEdicion ? obtenerProductoPorId(id) : null;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    imagen: ''
  });

  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    if (productoEditar) {
      setFormData({
        nombre: productoEditar.nombre || '',
        descripcion: productoEditar.descripcion || '',
        precio: productoEditar.precio || '',
        stock: productoEditar.stock || '',
        categoriaId: productoEditar.categoriaId || '',
        imagen: productoEditar.imagen || ''
      });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      // Crear URL temporal para previsualización
      const imagenUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imagen: imagenUrl
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productoData = {
      ...formData,
      precio: parseInt(formData.precio),
      stock: parseInt(formData.stock),
      categoriaId: parseInt(formData.categoriaId)
    };

    if (esEdicion) {
      editarProducto(parseInt(id), productoData);
    } else {
      agregarProducto(productoData);
    }

    navigate('/admin/productos');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                {esEdicion ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    {/* Nombre del Producto */}
                    <div className="mb-3">
                        Nombre del Producto
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre del producto"
                        required
                      />
                    </div>

                    {/* Precio */}
                    <div className="mb-3">
                      <label htmlFor="precio" className="form-label fw-bold">
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          id="precio"
                          name="precio"
                          value={formData.precio}
                          onChange={handleChange}
                          min="0"
                          step="100"
                          placeholder="0"
                          required
                        />Precio (CLP) 
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="mb-3">
                      <label htmlFor="stock" className="form-label fw-bold">
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        placeholder="0"
                        required
                      />Stock 
                    </div>

                    {/* Categoría */}
                    <div className="mb-3">
                      <select
                        className="form-select"
                        id="categoriaId"
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map(categoria => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    {/* Imagen */}
                    <div className="mb-3">
                      Imagen del Producto
                      <input
                        type="file"
                        className="form-control"
                        id="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}
                      />
                      <div className="form-text">
                        Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB
                      </div>
                      
                      {/* Vista previa de la imagen */}
                      {formData.imagen && (
                        <div className="mt-3">
                          <label className="form-label fw-bold">Vista previa:</label>
                          <div className="border rounded p-2 text-center">
                            <img 
                              src={formData.imagen} 
                              alt="Vista previa" 
                              className="img-fluid"
                              style={{ maxHeight: '200px', maxWidth: '100%' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Descripción */}
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        rows="5"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Describe las características del producto..."
                        required
                      ></textarea>
                      <div className="form-text">
                        {formData.descripcion.length}/500 caracteres
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/admin/productos')}
                      >
                        ↩️ Cancelar
                      </button>
                      
                      <div>
                        <small className="text-muted me-3">* Campos obligatorios</small>
                        <button type="submit" className="btn btn-primary">
                          {esEdicion ? '💾 Guardar Cambios' : '➕ Crear Producto'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioProducto;