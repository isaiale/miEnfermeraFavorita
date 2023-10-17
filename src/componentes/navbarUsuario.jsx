import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/logo.jpg'
import "../css/navbar.css"
import "../css/colores.css"


const NavbarUsuario = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary-400">
                <div className="container">
                    <a className="navbar-brand " href="#" >
                        <img src={logo} width="50" height="50" className="rounded-circle me-2" />
                        Mi Enfermera Favorita
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/">inicio</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/avisoPrivacidad">Aviso de Privacidad</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/desarrolladores">Acerca de</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/navegacionCifrados">Cifrado</Link>
                            </li>                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavbarUsuario;

