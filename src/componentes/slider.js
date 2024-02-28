import React from 'react';
import groceryBanner from '../img/IMGSlider.png';
import '../css/Slider.css';
import { Link } from 'react-router-dom';

const FreeShippingNotification = () => {
    return (
        <div className="free-shipping-notification">
            <div className="free-shipping-icon-container mb-4">
                <img src={groceryBanner} alt="Free Shipping Icon" className="free-shipping-icon" /> {/* Imagen */}
                <div className="circle"></div> {/* Div para el círculo */}
            </div>
            <div className="free-shipping-text-container mt-4 mb-4">
                <span className="free-shipping-text-label">Descubre nuestra amplia gama de productos de
                    <span className="free-shipping-text-content">
                        &nbsp;enfermería.
                    </span>
                </span>
                <span className="free-shipping-text">
                    ¡Haz tu compra hoy y lleva la calidad y el cuidado a un nuevo nivel!
                </span>
                <div className="row justify-content-start">
                    <Link to="/productos">
                    <div className='col'>
                        <button  className="btnVermas lead">Ver más <i class="fa fa-arrow-right"></i></button>
                    </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default FreeShippingNotification;
