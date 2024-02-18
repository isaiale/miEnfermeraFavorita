import React, { useState } from "react";
import "../css/sidebar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faCog, faSignOutAlt, faShoppingBasket, faStore, faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.jpg";


const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

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
            path: "/",
            name: "Salir",
            icon: <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />,
        },

    ]

    return (
        <div className="d-flex flex-column">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <img src={logo} className="rounded-circle me-1" alt="" width="50" height="50" style={{ marginLeft: isOpen ? "0" : "-70px" }} />
                    <h4 style={{ display: isOpen ? "block" : "none" }} className="logo">Admin</h4>
                    <div style={{ marginLeft: isOpen ? "25px" : "15px" }} className="bars">
                        {isOpen ?

                            <FontAwesomeIcon icon={faChevronLeft} className="me-2" onClick={toggle} />
                            :
                            <FontAwesomeIcon icon={faBars} className="me-2" onClick={toggle} />
                        }

                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <h2 style={{ display: isOpen ? "block" : "none", marginLeft: '-10px' }} className="link_text lead">{item.name}</h2>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;
