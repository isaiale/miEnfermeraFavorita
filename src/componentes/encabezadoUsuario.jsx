import React from "react";
import drImg from "../img/enfermera-removebg-preview.png";
import "../css/navbar.css";
import "../css/colores.css";
import { Link } from "react-router-dom";

const EncabezadoUser = () => {
    return (
        <div>            
            <div className="bg-primary-200 text-text-100 p-3 fadeInColor" style={{ minHeight: '550px' }}>
                <div className="d-flex flex-column-reverse flex-lg-row align-items-lg-center">
                    <div className="w-100">
                        <div className="mt-1">
                            <p className="text-center custom-text">¡Descubre nuestros productos que tenemos a la venta!</p>
                            <div className="text-center mt-3">
                                <Link className="btn fs-4" style={{background: '#0a7fad', color:'white'}} to="/avisoPrivacidad">Aviso de Privacidad</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 text-center">
                        <img src={drImg} alt="Imagen de la empresa" className="img-fluid mt-1 w-50" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EncabezadoUser;
