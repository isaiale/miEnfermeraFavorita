import React from 'react';
import groceryBanner from '../img/IMGSlider.png';
import imgenfermera from '../img/imgenfermera.png'
import '../css/Slider.css';
import { Link } from 'react-router-dom';

const FreeShippingNotification = () => {
    return (
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div className="free-shipping-notification">
                        <div className="free-shipping-icon-container mb-4">
                            <img src={imgenfermera} alt="Free Shipping Icon" className="free-shipping-icon imgslider" />
                            <div className="circle2">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#FF4081" d="M42.8,-51.5C58.1,-38.1,75.1,-27.2,81.7,-11.3C88.2,4.6,84.3,25.5,72.6,38.3C60.9,51,41.4,55.6,24.3,58C7.2,60.4,-7.5,60.7,-22.2,57.1C-37,53.5,-51.8,46,-60.4,33.6C-69.1,21.3,-71.6,4.1,-69.9,-13.5C-68.2,-31,-62.2,-49,-49.8,-63C-37.5,-76.9,-18.7,-86.9,-2.5,-83.9C13.7,-80.9,27.4,-65,42.8,-51.5Z" transform="translate(100 100)" />
                                </svg>
                            </div>
                        </div>
                        <div className="free-shipping-text-container mt-4 mb-4">
                            <span className="free-shipping-text-label">Explora lo último en tecnología de
                                <span className="free-shipping-text-content">
                                    &nbsp;salud y bienestar.
                                </span>
                            </span>

                            <span className="free-shipping-text">
                                Aprovecha nuestras ofertas y mejora tu estilo de vida con productos innovadores.
                            </span>
                            <div className="row justify-content-start">
                                <Link to="/accesorioss">
                                    <div className='col'>
                                        <button className="btnVermas lead">Descubre más <i className="fa fa-arrow-right"></i></button>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div className="free-shipping-notification">
                        <div className="free-shipping-icon-container mb-4">
                            <img src={groceryBanner} alt="Free Shipping Icon" className="free-shipping-icon imgslider" />
                            <div className="circle2">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#00E5FF" d="M49,-55C63.9,-45.8,76.7,-30.8,82.5,-12.4C88.3,6,87.2,27.8,77,43.4C66.8,59.1,47.6,68.5,29.7,69.8C11.9,71.2,-4.6,64.5,-18.6,56.8C-32.6,49.2,-44.1,40.7,-50.1,29.4C-56,18.1,-56.3,4,-51.9,-7.1C-47.5,-18.3,-38.4,-26.6,-29,-36.7C-19.5,-46.8,-9.8,-58.6,3.6,-63C17,-67.3,34,-64.1,49,-55Z" transform="translate(100 100)" />
                                </svg>
                            </div>
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
                                <Link to="/accesorioss">
                                    <div className='col'>
                                        <button className="btnVermas lead">Ver más <i class="fa fa-arrow-right"></i></button>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeShippingNotification;




// import React from 'react';
// import groceryBanner from '../img/IMGSlider.png';
// import '../css/Slider.css';
// import { Link } from 'react-router-dom';

// const FreeShippingNotification = () => {
//     return (
//         <div className="free-shipping-notification"> 
//             <div className="free-shipping-icon-container mb-4">
//                 <img src={groceryBanner} alt="Free Shipping Icon" className="free-shipping-icon" /> {/* Imagen */} 
//                 <div className="circle"></div> {/* Div para el círculo */}
//             </div>
//             <div className="free-shipping-text-container mt-4 mb-4">
//                 <span className="free-shipping-text-label">Descubre nuestra amplia gama de productos de
//                     <span className="free-shipping-text-content">
//                         &nbsp;enfermería.
//                     </span>
//                 </span>
//                 <span className="free-shipping-text">
//                     ¡Haz tu compra hoy y lleva la calidad y el cuidado a un nuevo nivel!
//                 </span>
//                 <div className="row justify-content-start">
//                     <Link to="/productos">
//                     <div className='col'>
//                         <button  className="btnVermas lead">Ver más <i class="fa fa-arrow-right"></i></button>
//                     </div>
//                     </Link>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FreeShippingNotification;
