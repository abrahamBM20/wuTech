import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h6>Derechos reservados 2025<br />WU-TECH venta y servicios de productos tecnológicos</h6>
          </div>
          <div className="col-md-4 mb-3 mb-md-0"></div>
          <div className="col-md-4">
            <h6 className="text-center">Síguenos en nuestras redes sociales</h6>
            <div className="text-center">
              <a href="#"><img src="/img/icons8-facebook-nuevo-50.png" alt="Facebook" /></a>
              <a href="#"><img src="/img/icons8-instagram-50.png" alt="Instagram" /></a>
              <a href="#"><img src="/img/icons8-tik-tok-50.png" alt="TikTok" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;