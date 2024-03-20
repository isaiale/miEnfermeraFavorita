import React from 'react';
import imgUser from '../img/Logo de mi enfermera favorita.jpg';
import '../css/comentariosClientes.css';

const comments = [
    {
      name: 'Isai',
      rating: 3,
      comment:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!'
    },
    {
      name: 'Alejandro',
      rating: 5,
      comment:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!'
    },
    {
      name: 'James',
      rating: 2,
      comment:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quibusdam aperiam sunt sit placeat doloremque exercitationem facere mollitia nam asperiores nemo, molestias perspiciatis cumque voluptatem obcaecati quia! Mollitia, voluptatem id!'
    }
  ];

const ComentariosClientes = () => {
    return (
        <div>
            <section className='opiniones mb-3'>
                <h4 className='text-center display-6'>Opinión de nuestros clientes</h4>
                <div className='caja-contenedor'>

                {comments.map((comment, index) => (
                    <div className="caja" key={index}>
                        <div className="user">
                            <div className="d-flex align-items-center">
                                <img src={imgUser} alt="" />
                                <div className="ms-2 d-flex flex-column">
                                    <p className="lead mt-0 mb-0">{comment.name}</p>
                                    <p className=" mt-0 mb-0">
                                    {Array(comment.rating)
                                        .fill()
                                        .map((_, i) => (
                                        <i key={i} className="fa fa-star"></i>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="comentarios lead">{comment.comment}</div>
                        </div>
                    </div>
                ))}
                </div>
            </section>
        </div>
    )
}

export default ComentariosClientes