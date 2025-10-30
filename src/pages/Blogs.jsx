import React from 'react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      titulo: "Cómo Juan transformó su gaming con una PC WU-TECH",
      fecha: "06 de septiembre de 2024",
      imagen: "/img/juanPC.webp",
      descripcion: "Juan, un apasionado de los videojuegos, adquirió una PC Gamer RTX5090 personalizada por WU-TECH. Gracias a nuestro servicio de armado, ahora disfruta de gráficos ultra y partidas sin lags. ¡Descubre su experiencia!"
    },
    {
      id: 2,
      titulo: "WU-TECH abre nueva sucursal en Santiago",
      fecha: "08 de septiembre de 2025",
      imagen: "/img/local.png",
      descripcion: "Estamos emocionados de anunciar nuestra nueva sucursal en el centro de Santiago, ofreciendo productos y servicios al instante. ¡Visítanos y sé parte de la revolución tecnológica!"
    }
  ];

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        {/* Portada de blogs */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-10">
            <h1 className="display-4 fw-bold">Nuestros Blogs</h1>
            <p className="lead">Explora historias de clientes y noticias sobre WU-TECH.</p>
          </div>
        </div>

        {/* blogs */}
        <section className="mt-5">
          <div className="row g-4">
            {blogs.map(blog => (
              <div key={blog.id} className="col-md-6">
                <div className="card shadow-sm h-100">
                  <img src={blog.imagen} className="card-img-top" alt={blog.titulo} />
                  <div className="card-body">
                    <h5 className="card-title">{blog.titulo}</h5>
                    <p className="card-text"><small className="text-muted">{blog.fecha}</small></p>
                    <p className="card-text">{blog.descripcion}</p>
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

export default Blogs;