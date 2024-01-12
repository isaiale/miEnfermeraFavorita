import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Image, Button, Dropdown } from 'react-bootstrap';
import logo from '../img/isai.jpg';
//import logo from '../img/logo.jpg';
import logoUser from '../img/uthh.png';
import { AuthContext } from '../autenticar/AuthProvider';
import '../css/colores.css';

function NavbarUsuario() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const history = useNavigate();
    const cerrarSesion = () => {
        logout();
        history('/');

    };

    return (
        <Navbar className='navbar-dark-text' style={{ fontSize: '15px', color: 'black' }} bg="light" expand="lg">
            <Container>
                {/* Logo a la izquierda */}
                <Navbar.Brand className='espacioImg'>
                    <Image src={logo} className='rounded-circle' alt="" width="70" height="70" style={{margin:'-12px'}}/>
                </Navbar.Brand>

                {/* Espacio entre elementos */}
                <Nav className="ms-auto me-4">
                    &nbsp;
                </Nav>

                {/* Navegaciones */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link href="/" >INICIO</Nav.Link>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} id="uniformes-dropdown">
                                UNIFORMES
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/productos">FILIPINAS</Dropdown.Item>
                                <Dropdown.Item href="#zapatos">CALZADO</Dropdown.Item>
                                <Dropdown.Item href="#chalecos">CHALECOS</Dropdown.Item>
                                <Dropdown.Item href="#batas">BATAS</Dropdown.Item>
                                <Dropdown.Item href="#otros">SACOS</Dropdown.Item>
                                <Dropdown.Item href="#otros">PANTALONES</Dropdown.Item>
                                <Dropdown.Item href="#otros">SUÉTERES</Dropdown.Item>
                                <Dropdown.Item href="#otros">SCRUBS</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link href="/accesorioss">ACCESORIOS</Nav.Link>
                        <Nav.Link href="/reservarA">RESERVAR</Nav.Link>
                        {/**<Nav.Link href="/contacto">CONTACTO</Nav.Link> */}
                    </Nav>
                    <Nav.Link href="/carritoDeCompras" className='fs-5 me-3'> <i className='fa fa-shopping-cart ' style={{fontSize:'25px'}} ></i></Nav.Link>

                    <Dropdown>
                        {isAuthenticated !== null ? (
                            isAuthenticated ? (
                                <>
                                    <Dropdown.Toggle as={Button} variant="light" id="dropdown-basic">
                                        <Image src={logoUser} className='rounded-circle' alt="" width="50" height="50" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#perfil">PERFIL</Dropdown.Item>
                                        <Dropdown.Item href="#compras">COMPRAS</Dropdown.Item>
                                        <Dropdown.Item className='text-danger' onClick={cerrarSesion}>CERRAR SESIÓN</Dropdown.Item>
                                    </Dropdown.Menu>
                                </>
                            ) : (
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/registroUsuario"> REGISTRO</Nav.Link>
                                        <div className='botonLogin'>
                                            <Link className='color' to="/login">
                                                <button className='btn rounded-pill' id="login-button" >
                                                    INICIAR SESIÓN
                                                </button>
                                            </Link>
                                        </div>
                                    </Nav>
                                </>
                            )
                        ) : null}
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarUsuario;
