import React, { useState, useEffect } from 'react';
import './App.css';
import heroBgImage from './pic7.jpg';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Generate image list (pic1.jpg to pic22.jpg, excluding pic12.jpg)
  const images = [];
  for (let i = 1; i <= 22; i++) {
    if (i !== 12) { // Skip pic12.jpg as it doesn't exist
      images.push(`/images/pic${i}.jpg`);
    }
  }

  // Social media icons
  const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setMobileMenuOpen(false);
        }
      }
    };

    // Keyboard navigation for lightbox
    const handleKeyPress = (e) => {
      if (lightboxOpen) {
        switch (e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleNavClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [lightboxOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !phone || !email || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    alert('¡Gracias por tu consulta! Te contactaremos pronto.');
    e.target.reset();
  };

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  const nextImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[prevIndex]);
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <img src="/images/logo.jpg" alt="Alupro Logo" className="logo-image" />
            </div>
            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#galeria">Galería</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
            <div
              className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero" style={{backgroundImage: `url(${heroBgImage})`}}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h2>Puertas de Calle a Medida</h2>
            <p>Especialistas en diseño, fabricación e instalación de puertas de aluminio personalizadas en Torredonjimeno</p>
            <a href="#contacto" className="cta-button">Solicitar Presupuesto</a>
          </div>
        </section>

        <section id="servicios" className="services">
          <div className="container">
            <h2>Nuestros Servicios</h2>
            <p className="services-subtitle">Soluciones completas en carpintería de aluminio para tu hogar</p>
            <div className="services-grid">
              <div className="service-card featured-service">
                <span className="service-icon">🚪</span>
                <h3>Puertas de Calle a Medida</h3>
                <p>Nuestra especialidad principal: diseño, fabricación e instalación de puertas de calle personalizadas con los mejores materiales de aluminio. Cada puerta es única y adaptada a las necesidades específicas de nuestros clientes.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">🪟</span>
                <h3>Ventanas de Aluminio</h3>
                <p>Ventanas de aluminio de alta calidad con excelente aislamiento térmico y acústico para mejorar el confort de su hogar.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">🏠</span>
                <h3>Cerramientos</h3>
                <p>Cerramientos para terrazas, balcones y porches adaptados a sus necesidades, creando espacios adicionales funcionales.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">🎯</span>
                <h3>Persianas</h3>
                <p>Instalación y reparación de persianas de todos los tipos y materiales para protección solar y privacidad.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">🦟</span>
                <h3>Mosquiteras</h3>
                <p>Mosquiteras a medida para mantener su hogar libre de insectos sin comprometer la ventilación.</p>
              </div>
              <div className="service-card">
                <span className="service-icon">🚿</span>
                <h3>Mamparas y Divisiones</h3>
                <p>Mamparas de baño y divisiones interiores de cristal y aluminio para optimizar espacios con elegancia.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="gallery">
          <div className="container">
            <h2>Nuestros Trabajos</h2>
            <p className="gallery-subtitle">Descubre algunos de nuestros proyectos de carpintería de aluminio</p>
            <div className="gallery-grid">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => openLightbox(image)}
                >
                  <div className="gallery-item-number">{index + 1}</div>
                  <img src={image} alt={`Trabajo ${index + 1} - Carpintería de aluminio`} />
                  <div className="gallery-overlay">
                    <div className="gallery-overlay-content">
                      <div className="gallery-zoom-icon">🔍</div>
                      <span>Ver imagen completa</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="nosotros" className="about">
          <div className="container">
            <h2>Sobre Nosotros</h2>
            <p className="about-subtitle">Tu socio de confianza en puertas de calle a medida en Torredonjimeno</p>

            <div className="about-content">
              <div className="about-intro">
                <h3>Alupro</h3>
                <p>En Alupro nos especializamos en <strong>puertas de calle personalizadas</strong> en Torredonjimeno y toda la provincia de Jaén. Con formación profesional y dedicación absoluta, nos enfocamos en brindar soluciones de alta calidad en carpintería de aluminio.</p>

                <p>Nuestra pasión por la excelencia nos impulsa a crear puertas únicas que no solo protegen y embellecen su hogar, sino que también reflejan su personalidad y estilo de vida. Cada proyecto es una oportunidad para demostrar nuestro compromiso con la calidad, la innovación y el servicio personalizado.</p>
              </div>

              <div className="about-details">
                <div className="philosophy-card">
                  <h3>Nuestra Filosofía</h3>
                  <p>Entendemos que la puerta de entrada de su hogar es mucho más que un simple acceso: es la primera impresión que causa su vivienda, un elemento de seguridad fundamental y una inversión a largo plazo. Por eso, cada puerta que fabricamos es el resultado de un proceso meticuloso que combina diseño personalizado, materiales premium y técnicas de instalación de vanguardia.</p>
                </div>

                <div className="process-card">
                  <h3>Nuestro Proceso</h3>
                  <p>Desde la consulta inicial hasta la instalación final, acompañamos a nuestros clientes en cada paso del proceso. Realizamos un estudio detallado de sus necesidades, proponemos soluciones innovadoras y ejecutamos el proyecto con la máxima precisión y cuidado por los detalles.</p>
                </div>
              </div>

              <div className="features-container">
                <h3 className="features-title">Nuestras Fortalezas</h3>
                <ul className="features">
                  <li>Especialización exclusiva en puertas de calle a medida</li>
                  <li>Diseños personalizados adaptados a cada cliente</li>
                  <li>Materiales de aluminio de primera calidad</li>
                  <li>Técnicas de instalación profesionales y modernas</li>
                  <li>Asesoramiento técnico completo y gratuito</li>
                  <li>Garantía extendida en todos nuestros trabajos</li>
                  <li>Servicio post-venta y mantenimiento especializado</li>
                  <li>Compromiso con plazos de entrega establecidos</li>
                </ul>
              </div>

              <div className="about-quote">
                <p>En Alupro, convertimos sus ideas en realidad, creando puertas que combinan funcionalidad, seguridad y belleza para hacer de su hogar un lugar único.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact">
          <div className="container">
            <h2>Contacto</h2>
            <p className="contact-subtitle">Estamos aquí para ayudarte con tu proyecto de carpintería de aluminio</p>
            <div className="contact-content">
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-item-header">
                    <span className="info-item-icon">📞</span>
                    <h3>Teléfono</h3>
                  </div>
                  <p><a href="tel:+34633631086">+34 633 63 10 86</a></p>
                </div>
                <div className="info-item">
                  <div className="info-item-header">
                    <span className="info-item-icon">🕒</span>
                    <h3>Horario</h3>
                  </div>
                  <p>Lunes - Viernes<br/>
                  8:30 - 13:30<br/>
                  17:00 - 20:00</p>
                  <p>Sábados y Domingos: Cerrado</p>
                </div>
                <div className="info-item">
                  <div className="info-item-header">
                    <span className="info-item-icon">🗺️</span>
                    <h3>Ubicación</h3>
                  </div>
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.0686119445!2d-3.9608843!3d37.7721682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6dcf92bde1ae47%3A0xec8c69b0995988fa!2sAluPro!5e0!3m2!1ses!2ses!4v1695377374000!5m2!1ses!2ses"
                      width="100%"
                      height="220"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Alupro"
                    ></iframe>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item-header">
                    <span className="info-item-icon">🌐</span>
                    <h3>Síguenos</h3>
                  </div>
                  <div className="contact-social-links">
                    <a
                      href="https://www.facebook.com/profile.php?id=61579908687749"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link facebook"
                    >
                      <FacebookIcon /> Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/alupro.torredonjimeno/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link instagram"
                    >
                      <InstagramIcon /> Instagram
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <div className="contact-form-header">
                  <span className="contact-form-icon">📧</span>
                  <h3>Solicitar Presupuesto</h3>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Tu nombre completo" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Número de teléfono" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Correo electrónico" required />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Describe tu proyecto en detalle" rows="4" required></textarea>
                  </div>
                  <button type="submit">Enviar Consulta</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Alupro</h3>
              <p>Especialistas en puertas de calle a medida y carpintería de aluminio en Torredonjimeno</p>
            </div>
            <div className="footer-social">
              <h3>Síguenos</h3>
              <div className="social-links">
                <a
                  href="https://www.facebook.com/profile.php?id=61579908687749"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link facebook"
                >
                  <FacebookIcon /> Facebook
                </a>
                <a
                  href="https://www.instagram.com/alupro.torredonjimeno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                >
                  <InstagramIcon /> Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Alupro - Carpintería de Aluminio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>‹</button>
            <img src={currentImage} alt="Imagen ampliada" />
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>›</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
