import React, { useState, useContext } from 'react';
import "../css/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faCog, faSignOutAlt, faShoppingBasket, faStore, faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../autenticar/AuthProvider';
import logo from "../img/logo.jpg";
import Swal from 'sweetalert2';

const Sidebar = () => {
    const { logout, user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const cerrarSesion = () => {
        Swal.fire({
            title: 'Salir',
            text: `¡${user.nombre} estas seguro de salir!`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/login');
            }
        });
    };

    const menuItem = [
        {
            path: "/inicioAdmin",
            name: "Inicio",
            icon: <FontAwesomeIcon icon={faHouse} className="me-2" />,
        },
        {
            path: "/ventasEmpleado",
            name: "Ventas",
            icon: <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />,
        },
        {
            path: "/clientesEmpleado",
            name: "Clientes",
            icon: <FontAwesomeIcon icon={faUser} className="me-2" />,
        },
        {
            path: "/productosEmpleado",
            name: "Productos",
            icon: <FontAwesomeIcon icon={faStore} className="me-2" />,
        },
        {
            path: "/configuracionEmpleado",
            name: "Configuracion",
            icon: <FontAwesomeIcon icon={faCog} className="me-2" />,
        },
        {
            path: "/Renta_productos",
            name: "Renta",
            icon: <FontAwesomeIcon icon={faStore} className="me-2" />,
        }
    ]

    return (
        <div className="d-flex flex-column">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div >
                    <div className="text-center mb-2">
                        <img src={logo} className="rounded-circle mt-2" alt="" width="50" height="50" />
                    </div>
                    <div className="top_section">
                        <h5 style={{ display: isOpen ? "block" : "none" }} className="logo">Administrar</h5>
                        <div style={{ marginLeft: isOpen ? "55px" : "-1px" }} className="bars">
                            <FontAwesomeIcon icon={faBars} onClick={toggle} />
                        </div>
                    </div>
                </div>

                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="linkSidebar" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text lead">{item.name}</h2>
                        </NavLink>
                    ))
                }

                <NavLink onClick={cerrarSesion} className="linkSidebar" activeclassName="active">
                    <div className="icon"><FontAwesomeIcon icon={faSignOutAlt} /></div>
                    <h2 style={{ display: isOpen ? "block" : "none" }} className="link_text lead">Salir</h2>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
