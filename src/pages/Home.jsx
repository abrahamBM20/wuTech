import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { productos } from '../data/productos'; // Sin extensión

const Home = () => {
  const productosDestacados = productos.slice(0, 3);

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        {/* Sección de bienvenida */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8 text-center">
            <img src="/img/logo.png" alt="WU-TECH" width="250" height="250" />
            <h4 className="text-muted mb-4">"Soluciones tecnológicas integrales"</h4>
            <h6 className="mb-4">Hardware de calidad y servicios informáticos profesionales</h6>
          </div>
        </div>

        {/* PRODUCTOS DESTACADOS */}
        <section className="mt-5">
          <h2 className="text-center mb-4">Productos Destacados</h2>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="row g-4">
                      {productosDestacados.map(producto => (
                        <div key={producto.id} className="col-md-4">
                          <ProductCard producto={producto} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="mt-5">
          <h2 className="text-center mb-4">Nuestros Servicios</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                  <i className="bi bi-tools display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Mantenimiento de Equipos</h5>
                  <p className="card-text">Reparación y optimización de computadoras y notebooks.</p>
                  <Link to="/servicios" className="btn btn-outline-primary">Más Información</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                  <i className="bi bi-pc-display display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Armado de PC</h5>
                  <p className="card-text">Construimos tu PC personalizado según tus necesidades.</p>
                  <Link to="/servicios" className="btn btn-outline-primary">Más Información</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                  <i className="bi bi-code-slash display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Software a Medida</h5>
                  <p className="card-text">Desarrollo de soluciones personalizadas para tu negocio.</p>
                  <Link to="/servicios" className="btn btn-outline-primary">Más Información</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacta con WUTECH */}
        <section className="mt-5 text-center">
          <h3>¿Listo para mejorar tu experiencia tecnológica?</h3>
          <p>Contacta con nosotros o explora nuestro catálogo completo.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contacto" className="btn btn-primary">Contáctanos</Link>
            <Link to="/productos" className="btn btn-outline-primary">Ver Todos los Productos</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;