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
            <h6 style={{ color: '#e36db4' }}>Categorías de Uniformes</h6>
            <ul>
              <li>Zapatos</li>
              <li>Atuendos</li>
              <li>Chalecos</li>
              <li>Vatas</li>
              <li>Otros</li>
            </ul>
          </Col>

          {/* Datos de la empresa (derecha) */}
          <Col xs={12} md={6} lg={3}>
            <h6 style={{ color: '#e36db4' }}>Datos de la Empresa</h6>
            <p><FontAwesomeIcon icon={faHome} className="me-2" /> Dirección de la empresa</p>
            <p><FontAwesomeIcon icon={faPhone} className="me-2" /> (123) 456-7890</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> info@empresa.com</p>
          </Col>

          {/* Redes de la empresa (derecha) */}
          <Col xs={12} md={6} lg={3}>
            <h6 style={{ color: '#e36db4' }}>Redes de la Empresa</h6>
            <div className='wrapper'>
              <ul>
                <li className='facebook'><a href='#'><i className='fa fa-facebook fa-2x' aria-hidden='true'></i></a></li>
                <li className='whatsapp'><a href='#'><i className='fa fa-whatsapp fa-2x' aria-hidden='true'></i></a></li>                
                <li className='twitter'><a href='#'><i className='fa fa-twitter fa-2x' aria-hidden='true'></i></a></li>
                <li className='telegram'><a href='#'><i className='fa fa-telegram fa-2x' aria-hidden='true'></i></a></li>
                <li className='instagram'><a href='#'><i className='fa fa-instagram fa-2x' aria-hidden='true'></i></a></li>
                <li className='snapchat'><a href='#'><i className='fa fa-snapchat fa-2x' aria-hidden='true'></i></a></li>
                <li className='linkedin'><a href='#'><i className='fa fa-linkedin fa-2x' aria-hidden='true'></i></a></li>
                <li className='google'><a href='#'><i className='fa fa-google fa-2x' aria-hidden='true'></i></a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Derechos reservados */}
      <div className="bg-secondary d-flex justify-content-center  py-2 ">
        <p className="mb-0" style={{marginLeft:'50px', marginRight:'20px'}}>© 2023 Empresa. Todos los derechos reservados.</p>
        <Link className='text-white' style={{marginLeft:'50px', marginRight:'20px'}} to="/politicaDeCookies" >Politicas de cookies</Link>
        <Link className='text-white' style={{marginLeft:'10px', marginRight:'20px'}} to="/terminosYcondiciones" >Terminos y condiciones</Link>
        <Link className='me-5 text-white' style={{ marginRight:'20px'}} to="/avisoPrivacidad" >Política de Privacidad</Link>
      </div>
    </footer>
  );
};

export default Footer;
