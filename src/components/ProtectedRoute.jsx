import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { usuarioActual } = useAuth();


  if (!usuarioActual) {
    return <Navigate to="/iniciar-sesion" replace />;
  }


  if (requireAdmin && usuarioActual.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default ProtectedRoute;