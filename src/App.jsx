import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Servicios from './pages/Servicios';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import IniciarSesion from './pages/IniciarSesion';
import RegistroUsuario from './pages/RegistroUsuario';
import Dashboard from './pages/admin/Dashboard';
import Usuarios from './pages/admin/Usuarios';
import FormularioUsuario from './pages/admin/FormularioUsuario';
import DetalleUsuario from './pages/admin/DetalleUsuario';
import Categorias from './pages/admin/Categorias';
import FormularioCategoria from './pages/admin/FormularioCategoria';
import './styles/style.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="min-vh-100">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/iniciar-sesion" element={<IniciarSesion />} />
                <Route path="/registro" element={<RegistroUsuario />} />
                
                {/* Rutas protegidas - Solo Admin */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/usuarios" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Usuarios />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/nuevo-usuario" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <FormularioUsuario />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/editar-usuario/:id" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <FormularioUsuario />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/detalle-usuario/:id" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <DetalleUsuario />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/categorias" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Categorias />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/categorias/nueva" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <FormularioCategoria />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/categorias/editar/:id" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <FormularioCategoria />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <CartModal />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;