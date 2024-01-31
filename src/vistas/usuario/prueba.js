import React from 'react';
import imgUser from '../../img/enfermera-removebg-preview.png';
import '../../css/comentariosClientes.css';

const ComentariosClientes = () => {
    return (
        <div>
            <section className='opiniones'>
                <h4 className='text-center'>Opinión de nuestros clientes</h4>
                <div className='caja-contenedor'>

                    <div className='caja'>
                        <div className='user'>
                            <div className='d-flex align-items-center'>
                                <img src={imgUser} alt="" />
                                <div className='ms-2 d-flex flex-column ms-2'>
                                    <p className='text-start lead mt-0 mb-0'>Isai</p>
                                    <p className='lead mt-0 mb-0'>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </p>
                                </div>
                            </div>
                            <div className="comentarios">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!
                            </div>
                        </div>
                    </div>
                    <div className='caja'>
                        <div className='user'>
                            <div className='d-flex align-items-center'>
                                <img src={imgUser} alt="" />
                                <div className='ms-2 d-flex flex-column ms-2'>
                                    <p className='text-start lead mt-0 mb-0'>Isai</p>
                                    <p className='lead mt-0 mb-0'>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </p>
                                </div>
                            </div>
                            <div className="comentarios">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!
                            </div>
                        </div>
                    </div>
                    <div className='caja'>
                        <div className='user'>
                            <div className='d-flex align-items-center'>
                                <img src={imgUser} alt="" />
                                <div className='ms-2 d-flex flex-column ms-2'>
                                    <p className='text-start lead mt-0 mb-0'>Isai</p>
                                    <p className='lead mt-0 mb-0'>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </p>
                                </div>
                            </div>
                            <div className="comentarios">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ComentariosClientes