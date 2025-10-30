import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Mensaje enviado correctamente');
  };

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow">
              <div className="d-flex justify-content-center">
                <img src="/img/logo.png" alt="WU-TECH" width="250" height="250" />
              </div>
              <div className="card-body custom-form">
                <form className="form form-container" onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="input-group">
                    <input 
                      type="text" 
                      id="user" 
                      name="nombre"
                      className="form-control" 
                      placeholder=" " 
                      required 
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    <label htmlFor="user" className="form-label">Nombre</label>
                  </div>

                  {/* Correo */}
                  <div className="input-group mt-3">
                    <input 
                      type="email" 
                      id="correo" 
                      name="correo"
                      className="form-control" 
                      placeholder=" " 
                      required 
                      value={formData.correo}
                      onChange={handleChange}
                    />
                    <label htmlFor="correo" className="form-label">Correo</label>
                  </div>

                  {/* Mensaje */}
                  <div className="mt-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea 
                      id="mensaje" 
                      name="mensaje"
                      className="form-control" 
                      rows="4" 
                      placeholder="Escribe tu mensaje aquí..."
                      value={formData.mensaje}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Newsletter */}
                  <div className="form-check mt-3 d-flex align-items-center">
                    <input 
                      className="form-check-input me-2" 
                      type="checkbox" 
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-0 mt-5" htmlFor="newsletter">
                      Suscribirme al Newsletter
                    </label>
                  </div>

                  {/* Botón */}
                  <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-primary">Enviar</button>
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

export default Contacto;