import React from 'react';
import { Link } from 'react-router-dom';
import imgError500 from '../img/error-500-monstruo.png';  // Cambia a la imagen correspondiente al error 500
import '../css/error500.css';  // Crea un archivo de estilo específico para el error 500

const Error500 = () => {
    return (
        <div className='contenido mt-3'>
            <h2 className='titulo'>500 - Oops! Error interno del servidor</h2>
            <div className='circulo'>
                <img className='img-fluid w-100' src={imgError500} alt="Error 500" />
            </div>
            <p className='texto2'>Lo sentimos, ha ocurrido un error interno en el servidor.</p>
            <div className='text-center mt-0'>
                <Link className="rounded-pill btn" style={{ background: '#edc204', color: 'white', fontFamily: 'Jost, sans-serif', fontSize: '16px' }} to="/">
                    Volver a inicio
                </Link>
            </div>
        </div>
    );
};

export default Error500;
