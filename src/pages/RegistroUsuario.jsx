import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';
import { useUsuarios } from '../hooks/useUsuarios';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',     // Nombre completo
    username: '',   // Nombre de usuario  
    correo: '',
    correo1: '',
    pass: '',
    pass2: ''
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const { errors, validateField, validateForm } = useFormValidation();
  const { agregarUsuario } = useUsuarios();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del servidor cuando el usuario empiece a escribir
    if (serverError) {
      setServerError('');
    }

    // Validación en tiempo real
    validateField(name, value, formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError('');

    // Validar todos los campos antes de enviar
    const isValid = validateForm(formData);

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      // Registrar el usuario usando el hook
      const newUser = agregarUsuario(formData);
      
      console.log('Usuario registrado exitosamente:', newUser);
      
      // Mostrar mensaje de éxito
      alert('¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.');
      
      // Redirigir al login
      navigate('/iniciar-sesion');
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si el formulario es válido
  const isFormValid = () => {
    return (
      formData.nombre &&
      formData.username &&
      formData.correo &&
      formData.correo1 &&
      formData.pass &&
      formData.pass2 &&
      !errors.nombre &&
      !errors.username &&
      !errors.correo &&
      !errors.correo1 &&
      !errors.pass &&
      !errors.pass2
    );
  };

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow">
              <div className="d-flex justify-content-center mt-5">
                <img src="/img/logo.png" alt="WU-TECH" width="250" height="250" />
              </div>
              <div className="card-body custom-form">
                
                {/* Mostrar error del servidor */}
                {serverError && (
                  <div className="alert alert-danger" role="alert">
                    {serverError}
                  </div>
                )}

                <form className="form form-container" onSubmit={handleSubmit}>
                  
                  {/* Nombre completo */}
                  <div className="input-group">
                    <input 
                      type="text" 
                      id="nombre" 
                      name="nombre"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      placeholder=" " 
                      required 
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    {errors.nombre && <div className="text-danger small mt-1">{errors.nombre}</div>}
                  </div>

                  {/* Nombre de usuario */}
                  <div className="input-group mt-3">
                    <input 
                      type="text" 
                      id="username" 
                      name="username"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder=" " 
                      required 
                      value={formData.username}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="username" className="form-label">Nombre de usuario</label>
                    {errors.username && <div className="text-danger small mt-1">{errors.username}</div>}
                  </div>

                  {/* Correo */}
                  <div className="input-group mt-3">
                    <input 
                      type="email" 
                      id="correo" 
                      name="correo"
                      className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                      placeholder=" "
                      value={formData.correo}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="correo" className="form-label">Correo electrónico</label>
                    {errors.correo && <div className="text-danger small mt-1">{errors.correo}</div>}
                  </div>

                  {/* Confirmar correo */}
                  <div className="input-group mt-3">
                    <input 
                      type="email" 
                      id="correo1" 
                      name="correo1"
                      className={`form-control ${errors.correo1 ? 'is-invalid' : ''}`}
                      placeholder=" "
                      value={formData.correo1}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="correo1" className="form-label">Confirmar correo electrónico</label>
                    {errors.correo1 && <div className="text-danger small mt-1">{errors.correo1}</div>}
                  </div>

                  {/* Contraseña */}
                  <div className="input-group mt-3">
                    <input 
                      type="password" 
                      id="pass" 
                      name="pass"
                      className={`form-control ${errors.pass ? 'is-invalid' : ''}`}
                      placeholder=" "
                      value={formData.pass}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="pass" className="form-label">Contraseña</label>
                    {errors.pass && <div className="text-danger small mt-1">{errors.pass}</div>}
                  </div>

                  {/* Confirmar contraseña */}
                  <div className="input-group mt-3">
                    <input 
                      type="password" 
                      id="pass2" 
                      name="pass2"
                      className={`form-control ${errors.pass2 ? 'is-invalid' : ''}`}
                      placeholder=" "
                      value={formData.pass2}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="pass2" className="form-label">Confirmar contraseña</label>
                    {errors.pass2 && <div className="text-danger small mt-1">{errors.pass2}</div>}
                  </div>

                  <div className="enlaces mt-3">
                    <Link to="/iniciar-sesion">Ya tengo una cuenta</Link>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading || !isFormValid()}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registrando...
                        </>
                      ) : (
                        'Registrar'
                      )}
                    </button>
                  </div>
                </form>
              </div>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;