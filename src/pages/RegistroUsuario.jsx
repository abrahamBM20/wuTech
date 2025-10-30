import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    user: '',
    correo: '',
    correo1: '',
    pass: '',
    pass2: '',
    number: ''
  });

  const { errors, validateField } = useFormValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación en tiempo real
    validateField(name, value, formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const validations = [
      validateField('user', formData.user, formData),
      validateField('correo', formData.correo, formData),
      validateField('correo1', formData.correo1, formData),
      validateField('pass', formData.pass, formData),
      validateField('pass2', formData.pass2, formData)
    ];

    if (validations.every(valid => valid)) {
      console.log('Registrando usuario:', formData);
      alert('Usuario registrado exitosamente');
      // Aquí iría la lógica de registro
    }
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
                <form className="form form-container" onSubmit={handleSubmit}>
                  {/* Nombre completo */}
                  <div className="input-group">
                    <input 
                      type="text" 
                      id="user" 
                      name="user"
                      className="form-control" 
                      placeholder=" " 
                      required 
                      value={formData.user}
                      onChange={handleChange}
                    />
                    <label htmlFor="user" className="form-label">Nombre completo</label>
                    {errors.user && <div className="text-danger small mt-1">{errors.user}</div>}
                  </div>

                  {/* Correo */}
                  <div className="input-group mt-3">
                    <input 
                      type="email" 
                      id="correo" 
                      name="correo"
                      className="form-control" 
                      placeholder=" "
                      value={formData.correo}
                      onChange={handleChange}
                    />
                    <label htmlFor="correo" className="form-label">Correo</label>
                    {errors.correo && <div className="text-danger small mt-1">{errors.correo}</div>}
                  </div>

                  {/* Confirmar correo */}
                  <div className="input-group mt-3">
                    <input 
                      type="email" 
                      id="correo1" 
                      name="correo1"
                      className="form-control" 
                      placeholder=" "
                      value={formData.correo1}
                      onChange={handleChange}
                    />
                    <label htmlFor="correo1" className="form-label">Confirmar correo</label>
                    {errors.correo1 && <div className="text-danger small mt-1">{errors.correo1}</div>}
                  </div>

                  {/* Contraseña */}
                  <div className="input-group mt-3">
                    <input 
                      type="password" 
                      id="pass" 
                      name="pass"
                      className="form-control" 
                      placeholder=" "
                      value={formData.pass}
                      onChange={handleChange}
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
                      className="form-control" 
                      placeholder=" "
                      value={formData.pass2}
                      onChange={handleChange}
                    />
                    <label htmlFor="pass2" className="form-label">Confirmar contraseña</label>
                    {errors.pass2 && <div className="text-danger small mt-1">{errors.pass2}</div>}
                  </div>

                  {/* Teléfono (opcional) */}
                  <div className="input-group mt-3">
                    <input 
                      type="text" 
                      id="number" 
                      name="number"
                      className="form-control" 
                      placeholder=" "
                      value={formData.number}
                      onChange={handleChange}
                    />
                    <label htmlFor="number" className="form-label">Teléfono / celular (opcional)</label>
                  </div>

                  <div className="enlaces mt-3">
                    <Link to="/iniciar-sesion">Ya tengo una cuenta</Link>
                  </div>
                </form>
                <div className="d-flex justify-content-center mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Registrar
                  </button>
                </div>
              </div>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;