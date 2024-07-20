import React, { useState } from "react";
import "../css/sidebar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faSignOutAlt, faShoppingBasket, faBars, faShoppingBag, faHandshake } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.jpg";


const Sidebargerente = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/inicioGerente",
            name: "Inicio",
            icon: <FontAwesomeIcon icon={faHouse} className="me-2" />,
        },
        
        {
            path: "/ComprasG",
            name: "Compras",
            icon: <FontAwesomeIcon icon={faShoppingBag} className="me-2" />,
        },
        {
            path: "/proveedoresG",
            name: "Proveedores",
            icon: <FontAwesomeIcon icon={faHandshake} className="me-2" />,
        },
        {
            path: "/ClientesFrecuentesG",
            name: "Clientes frecuentes",
            icon: <FontAwesomeIcon icon={faUser} className="me-2" />,
        },{
            path: "/inventarioG",
            name: "Inventario",
            icon: <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />,
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
                <div >
                    <div className="text-center mb-2">
                        <img src={logo} className="rounded-circle mt-2" alt="" width="50" height="50" />
                    </div>
                    <div className="top_section">
                        <h5 style={{ display: isOpen ? "block" : "none" }} className="logo">Gerente</h5>
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
            </div>            
        </div>
    );
};

export default Sidebargerente;
