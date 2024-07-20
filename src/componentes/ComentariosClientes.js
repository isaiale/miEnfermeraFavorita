import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import imgUser from '../img/AdminIsai.jpg';
import '../css/comentariosClientes.css';
import { comentarios, Api_Validacio_Correo } from '../url/urlSitioWeb';

const ComentariosClientes = () => {
    const [comments, setComments] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [comentario, setComentario] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        fetchComments();        
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (scrollPosition > currentScrollPos) {
                setShowAllComments(false);
            }
            setScrollPosition(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollPosition]);

    useEffect(() => {
        const handleScrollForComments = () => {
            const currentScrollPos = window.pageYOffset;
            if (scrollPosition > currentScrollPos) {
                setExpandedComments({});
            }
            setScrollPosition(currentScrollPos);
        };

        window.addEventListener('scroll', handleScrollForComments);
        return () => window.removeEventListener('scroll', handleScrollForComments);
    }, [scrollPosition]);

    const fetchComments = async () => {
        try {
            const response = await fetch(comentarios);
            const data = await response.json();
            setComments(data.reverse());
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleStarClick = (value) => {
        setEstrellas(value);
    };

    const validateEmail = async (email) => {
        try {
            const response = await fetch(`${Api_Validacio_Correo}${email}`);
            const data = await response.json();
            return data.format && data.dns && !data.disposable;
        } catch (error) {
            console.error('Error validating email:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');

        const isValidEmail = await validateEmail(email);

        if (!isValidEmail) {
            setEmailError('Correo electrónico no válido');
            return;
        }

        const newComment = { usuario, email, comentario, estrellas };

        try {
            const response = await fetch(comentarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                setUsuario('');
                setEmail('');
                setComentario('');
                setEstrellas(0);
                setShowModal(false);
                Swal.fire('¡Comentario agregado!', 'Tu comentario ha sido agregado exitosamente.', 'success');
                fetchComments();
            } else {
                const errorText = await response.text();
                console.error('Failed to add comment:', errorText);
                Swal.fire('Error', 'No se pudo agregar tu comentario. Inténtalo de nuevo.', 'error');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            Swal.fire('Error', 'No se pudo agregar tu comentario. Inténtalo de nuevo.', 'error');
        }
    };

    const handleCloseModal = () => {
        setUsuario('');
        setEmail('');
        setComentario('');
        setEstrellas(0);
        setEmailError('');
        setShowModal(false);
    };

    const handleExpandComment = (index) => {
        setExpandedComments((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const displayedComments = showAllComments ? comments : comments.slice(0, 3);

    return (
        <div>
            <section className='opiniones mb-3'>
                <h4 className='text-center display-6'>Opinión y calificación de nuestros clientes</h4>
                <div className="center-button">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setShowModal(true)}
                        style={{ backgroundColor: '#FF4081', color: 'white' }}
                        title="Agregar Comentario"
                    >
                        <i className="fa fa-plus"></i> Comentar
                    </button>
                </div>

                <div className='caja-contenedor'>
                    {displayedComments.map((comment, index) => (
                        <div className="caja" key={index}>
                            <div className="user">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        {comment.usuario === 'Isai_A_F' ? (
                                            <img src={imgUser} alt="" className="no-drag" onDragStart={(e) => e.preventDefault()} />
                                        ) : (
                                            <div className="user-icon">
                                                <i className="fa fa-user"></i>
                                            </div>
                                        )}
                                        <div className="ms-2 d-flex flex-column">
                                            <p className="lead mt-0 mb-0">{comment.usuario}</p>
                                            <p className="mt-0 mb-0">
                                                {Array(5).fill().map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className="fa fa-star"
                                                        style={{ color: i < comment.estrellas ? 'yellow' : 'gray' }}
                                                    ></i>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="fecha text-muted">{comment.fechaCreacion}</p>
                                </div>
                                <div className="comentarios lead">
                                    {expandedComments[index] || comment.comentario.length <= 70 ? (
                                        comment.comentario
                                    ) : (
                                        <>
                                            {comment.comentario.substring(0, 100)}...
                                            <button className="btn btn-link" onClick={() => handleExpandComment(index)}>Ver más</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showAllComments && comments.length > 3 && (
                    <div className="text-center mt-3">
                        <button className="btn" onClick={() => setShowAllComments(true)}>
                            Ver más comentarios
                        </button>
                    </div>
                )}
            </section>

            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Comentario</h5>
                                <button type='button' className='btn-close' onClick={handleCloseModal} data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="usuario">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="usuario"
                                            name="usuario"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        {emailError && <small className="text-danger">{emailError}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comentario">Comentario</label>
                                        <textarea
                                            className="form-control"
                                            id="comentario"
                                            name="comentario"
                                            rows="3"
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="estrellas">Estrellas</label>
                                        <div className="star-rating">
                                            {Array(5).fill().map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`fa fa-star ${i < estrellas ? 'selected' : ''}`}
                                                    onClick={() => handleStarClick(i + 1)}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="btnvermas mt-3">
                                        <i className="fa fa-save" title="Guardar"></i> Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComentariosClientes;
