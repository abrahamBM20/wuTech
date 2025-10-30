import React from 'react';

const Servicios = () => {
  const servicios = [
    {
      id: 1,
      icono: "bi-tools",
      titulo: "Mantenimiento de Equipos",
      descripcion: "Reparación y optimización de computadoras y notebooks.",
      detalle: "Ofrecemos servicios de diagnóstico, reparación y actualización de hardware y software. Incluye limpieza de componentes, actualización de drivers y resolución de fallos."
    },
    {
      id: 2,
      icono: "bi-pc-display",
      titulo: "Armado de PC",
      descripcion: "Construimos tu PC personalizado según tus necesidades.",
      detalle: "Diseñamos PCs con componentes de alta calidad. Elige entre configuraciones para gaming, trabajo o estudio, con soporte técnico incluido."
    },
    {
      id: 3,
      icono: "bi-code-slash",
      titulo: "Software a Medida",
      descripcion: "Desarrollo de soluciones personalizadas para tu negocio.",
      detalle: "Creamos softwares personalizados, desde sistemas de gestión hasta aplicaciones web, adaptadas a las necesidades de tu empresa."
    }
  ];

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        {/* Portada de servicios */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-10">
            <h1 className="display-4 fw-bold">Nuestros Servicios</h1>
            <p className="lead">En WU-TECH ofrecemos soluciones tecnológicas personalizadas para potenciar tu experiencia digital.</p>
          </div>
        </div>

        {/* Sección de servicios */}
        <section className="mt-5">
          <div className="row g-4">
            {servicios.map(servicio => (
              <div key={servicio.id} className="col-md-4">
                <div className="card shadow-sm h-100 text-center">
                  <div className="card-body">
                    <i className={`bi ${servicio.icono} display-4 text-primary mb-3`}></i>
                    <h5 className="card-title">{servicio.titulo}</h5>
                    <p className="card-text">{servicio.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detalles de servicios */}
        <section className="mt-5">
          <div className="row g-4">
            {servicios.map(servicio => (
              <div key={servicio.id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title">{servicio.titulo}</h2>
                    <p className="card-text">{servicio.detalle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Servicios;