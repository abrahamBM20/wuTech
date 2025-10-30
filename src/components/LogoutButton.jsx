import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al home después del logout
  };

  return (
    <button 
      className="btn btn-outline-danger btn-sm"
      onClick={handleLogout}
      title="Cerrar sesión"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;