import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    user: '',
    pass: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.user || !formData.pass) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const result = login(formData.user, formData.pass);
    
    if (result.success) {
      console.log('Login exitoso:', result.user);
      if (result.user.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
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
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger text-center" role="alert">
                      {error}
                    </div>
                  )}

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
                      disabled={loading}
                    />
                    <label htmlFor="user" className="form-label">Usuario</label>
                  </div>

                  <div className="input-group mt-3">
                    <input 
                      type="password" 
                      id="pass" 
                      name="pass"
                      className="form-control" 
                      placeholder=" "
                      value={formData.pass}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label htmlFor="pass" className="form-label">Contraseña</label>
                  </div>

                  <div className="enlaces mt-3">
                    <Link to="/registro">No tengo una cuenta</Link>
                    <Link to="">Olvidé mi contraseña</Link>
                  </div>
                  
                  <div className="d-flex justify-content-center mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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

export default IniciarSesion;