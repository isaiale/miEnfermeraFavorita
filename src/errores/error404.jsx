import React from 'react'
import { Link } from 'react-router-dom';
import imgError404 from '../img/error-404-monstruo.png';
import '../css/error404.css';

const Error404 = () => {
    return (
        <div className='contenido mt-3'>
            <h2 className='titulo'>404 - Opps! Página no encontrada</h2>
            <div className='circulo'>
                <img className='img-fluid w-100' src={imgError404} alt=''/>
            </div>
            <p className='texto2'>Lo sentimos, la página que buscas no existe.</p>
            <div className='text-center mt-0'>
                <Link className="rounded-pill btn" style={{background: '#edc204', color: 'white', fontFamily:'Jost, sans-serif', fontSize: '16px'}} to="/">
                    Volver atras
                </Link>
            </div>
        </div>
    )
}
export default Error404;