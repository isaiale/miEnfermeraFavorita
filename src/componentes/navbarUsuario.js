import React, { useState, useContext, useEffect } from 'react';
import logoU from '../img/Logo de mi enfermera favorita.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faHouse, faShirt, faRightFromBracket, faShoppingBasket, faTag, faBars, faXmark, faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../css/navbar.css';
import { AuthContext } from '../autenticar/AuthProvider';
import { Dropdown, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CategoriaProducto } from '../url/urlSitioWeb';

const NavbarUsuario = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const [abrirDrop, setAbrirDrop] = useState(false);
    const [abrirDrop1, setAbrirDrop1] = useState(false);
    const [abrirDrop2, setAbrirDrop2] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(CategoriaProducto);
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa.');
                }
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
            }
        };

        fetchCategorias();
    }, []);

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const menuItem = [
        {
            path: "/",
            name: "Inicio",
            icon: <FontAwesomeIcon icon={faHouse} className="me-2" />,
        },
        {
            path: "/reservarA",
            name: "Rentar",
            icon: <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />,
        },
        {
            path: "/accesorioss",
            name: "Accesorios",
            icon: <FontAwesomeIcon icon={faTag} className="me-2" />,
        }/* ,
        {
            path: "/contacto",
            name: "Catalogo",
            icon: <FontAwesomeIcon icon={faTag} className="me-2" />,
        } */
    ];

    return (
        <div className='headerNavbar'>
            <div className='bordeNavbar'>
                <img className="logoNavbar rounded-circle" src={logoU} alt="Logo" />
                <button className="abrir-menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} className="me-2" />
                </button>

                <nav className={`nav ${menuVisible ? 'visible' : ''}`}>

                    <button className="cerrar-menu" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faXmark} className="me-2" />
                    </button>

                    {menuItem.map((item, index) => (
                        <Link to={item.path} key={index} className={` ${menuVisible ? 'navLinkTrue ' : 'navLinkFalse lead ms-3'}`}>
                            <div style={{ display: menuVisible ? "block" : "none" }} >{item.icon}</div>
                            <h2 className=' lead '>{item.name}</h2>
                        </Link>
                    ))}
                    <>
                        <Dropdown className='Dropdown lead'
                            show={abrirDrop}
                            onMouseOver={() => setAbrirDrop(true)}
                            onMouseOut={() => setAbrirDrop(false)}
                            as={Nav.Item}>
                            <Dropdown.Toggle className='text-toggle' as={Nav.Link} id="dropdown">
                                {menuVisible ? (
                                    <>
                                        <FontAwesomeIcon icon={faShirt} className="me-2" />
                                        Uniformes
                                    </>
                                ) : (
                                    <>
                                        Uniformes
                                    </>
                                )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='lead'>
                                {categorias.map((categoria) => (
                                    <Dropdown.Item as={Link} to={`/productos/${categoria._id}`} key={categoria._id}>
                                        {categoria.nombre}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className='Dropdown lead'
                            show={abrirDrop1}
                            onMouseOver={() => setAbrirDrop1(true)}
                            onMouseOut={() => setAbrirDrop1(false)}
                            as={Nav.Item}>
                            <Dropdown.Toggle className='' as={Nav.Link} id="dropdown">
                                {menuVisible ? (
                                    <>
                                        <FontAwesomeIcon icon={faSearch} className="me-2" />Buscar
                                    </>
                                ) : (
                                    <>
                                        Buscar
                                    </>
                                )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {/* <Dropdown.Item as={Link} to="/busquedasimple">Busqueda Simple</Dropdown.Item> */}
                                <Dropdown.Item as={Link} to="/busquedaAvanzada">Busqueda Avanzada</Dropdown.Item>
                                {/* <Dropdown.Item as={Link} to="/contacto">Contacto</Dropdown.Item>*/}
                                <Dropdown.Item as={Link} to="/ayuda">Diabetes</Dropdown.Item> 
                            </Dropdown.Menu>
                        </Dropdown>
                        {isAuthenticated !== null && user?.rol === "User" ? (
                            <>
                                <Link to='/carritoDeCompras' className={` ${menuVisible ? 'navLinkFalse lead ms-3' : 'navLinkFalse lead ms-3'}`}>
                                    <div ><FontAwesomeIcon icon={faCartShopping} className="me-2" /></div>
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}

                        <Dropdown className='Dropdown lead' as={Nav.Item}
                            show={abrirDrop2}
                            onMouseOver={() => setAbrirDrop2(true)}
                            onMouseOut={() => setAbrirDrop2(false)}>

                            {isAuthenticated !== null && user?.rol === "User" ? (
                                <>
                                    <Dropdown.Toggle className='text-dark' as={Nav.Link} variant="light" id="dropdown">
                                        <span>Bienvenido <i className=''>{user.nombre}</i></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/perfil"><i className='fa fa-user'></i> PERFIL</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/Compras"><i className="fa fa-shopping-bag"></i> COMPRAS</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/RentasUser"><i className="fa fa-shopping-bag"></i> RENTAS</Dropdown.Item>
                                        <Dropdown.Item className='text-danger' onClick={cerrarSesion}>
                                            <FontAwesomeIcon icon={faRightFromBracket} /> CERRAR SESIÓN
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </>
                            ) : (
                                <div className='botonLogin ms-3'>
                                    <Link className='colorRegistro me-1' to="/registroUsuario">
                                        <button className='btn lead' id="login-button" >
                                            Registro
                                        </button>
                                    </Link>
                                    <Link className='colorrIniciarSesion me-1' to="/login">
                                        <button className='btn lead' id="login-button" >
                                            Iniciar sesión
                                        </button>
                                    </Link>
                                </div>
                            )}

                        </Dropdown>
                    </>
                </nav>
            </div>
        </div>
    );
};

export default NavbarUsuario;
