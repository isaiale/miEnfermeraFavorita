import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../img/logo.jpg';
import '../css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <Container className="py-4 ">
        <Row>
          {/* Logo e información de la empresa (izquierda) */}
          <Col xs={12} md={6} lg={3}>
            <div className='text-center'>
              <Image className='rounded-circle text-center' src={logo} width="140" height="140" alt="logo" fluid />
              <p className='text-start'>Somos el mejor distribuidor de uniformes profesionales a nivel nacional.</p>
            </div>
          </Col>

          {/* Categorías de uniformes (centro) */}
          <Col xs={12} md={6} lg={3}>
            <h6 style={{
              color: '#FF4081',
            }}>
              Categorías de Uniformes
            </h6>
            <ul>
              <li>Zapatos</li>
              <li>Atuendos</li>
              <li>Chalecos</li>
              <li>Batas</li>
              <li>Otros</li>
            </ul>
          </Col>

          {/* Datos de la empresa (derecha) */}
          <Col xs={12} md={6} lg={3}>
            <h6 style={{ color: '#FF4081' }}>Datos de la Empresa</h6>
            <p><FontAwesomeIcon icon={faHome} className="me-2" /> Dirección de la empresa</p>
            <p><FontAwesomeIcon icon={faPhone} className="me-2" /> (123) 456-7890</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> info@empresa.com</p>
          </Col>

          {/* Redes de la empresa (derecha) */}
          <Col xs={12} md={6} lg={3}>
            <h6 style={{ color: '#FF4081' }}>Redes de la Empresa</h6>
            <div className='wrapper'>
              <ul>
                <li className='facebook'><a href="https://facebook.com" aria-label="Facebook">
                  <i className='fa fa-facebook fa-2x' aria-hidden='true'></i>
                </a>
                </li>
                {/* <li className='whatsapp'><a href="" aria-label="WhatsApp"><i className='fa fa-whatsapp fa-2x' aria-hidden='true'></i></a></li>
                <li className='twitter'><a href="" aria-label="Twitter"><i className='fa fa-twitter fa-2x' aria-hidden='true'></i></a></li>
                <li className='telegram'><a href="" aria-label="Telegram"><i className='fa fa-telegram fa-2x' aria-hidden='true'></i></a></li>
                <li className='instagram'><a href="" aria-label="Instagram"><i className='fa fa-instagram fa-2x' aria-hidden='true'></i></a></li>
                <li className='snapchat'><a href="" aria-label="Snapchat"><i className='fa fa-snapchat fa-2x' aria-hidden='true'></i></a></li>
                <li className='linkedin'><a href="" aria-label="LinkedIn"><i className='fa fa-linkedin fa-2x' aria-hidden='true'></i></a></li>
                <li className='google'><a href="" aria-label="Google"><i className='fa fa-google fa-2x' aria-hidden='true'></i></a></li> */}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Derechos reservados */}
      <div className="bg-secondary d-flex justify-content-between align-items-center py-2 text-white">
        <p className="ms-4 m-0">© 2023 Mi enfermera Favorita. Todos los derechos reservados.</p>
        <div className="d-flex me-4">
          <Link className='text-white ms-3' to="/politicaDeCookies">Políticas de cookies</Link>
          <Link className='text-white ms-3' to="/avisoPrivacidad">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
