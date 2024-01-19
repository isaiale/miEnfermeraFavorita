import React from 'react';
import imgUser from '../img/Logo de mi enfermera favorita.jpg';
import '../css/comentariosClientes.css';

const ComentariosClientes = () => {
    return (
        <div>
            <section className='opiniones'>
                <h4 className='text-center'>Opinión de nuestros clientes</h4>
                <div className='caja-contenedor'>
                    <div className='caja'>
                        <div className='user'>
                            <img src={imgUser} alt="" />
                            <h3>Isai</h3>
                            <div className="comentarios">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!
                            </div>
                        </div>
                    </div>
                    <div className='caja'>
                        <div className='user'>
                            <img src={imgUser} alt="" />
                            <h3>Alejandro</h3>
                            <div className="comentarios">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!
                            </div>
                        </div>
                    </div>
                    <div className='caja'>
                        <div className='user'>
                            <img src={imgUser} alt="" />
                            <h3>Alejandro</h3>
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