import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UrlUsuarios } from '../url/urlSitioWeb';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../utilidad/Toast'; // Toast 

function RegistroUsuario() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //Manejo de Toast
    const showToastMessage = (message, toastColor) => {
        setMessage(message);
        setToastColor(toastColor);
        setShowToast(true);

        // Oculta el Toast después de 5 segundos
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones iniciales
        if (!nombre || !apellido || !correo || !telefono || !password) {
            showToastMessage('Por favor, completa todos los campos.', 'info');
            return;
        }

        if (!nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/.test(nombre)) {
            showToastMessage('El nombre debe contener más de 2 letras.', 'info');
            return;
        }


        if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/.test(apellido)) {
            showToastMessage('El apellido debe contener más de 2 letras.', 'info');
            return;
        }

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            showToastMessage('Por favor, introduce una dirección de correo electrónico válida.', 'info');
            return;
        }

        if (telefono.length === 9 || !/[0-9]/.test(telefono) || !/\d/.test(telefono)) {
            showToastMessage('El numero debe tener 10 números.', 'info');
            return;
        }

        if (
            password.length < 8 ||
            !/[a-z]/.test(password) || // al menos una letra minúscula
            !/[A-Z]/.test(password) || // al menos una letra mayúscula
            !/\d/.test(password) ||    // al menos un número
            !/[!@#$%^&*(),.?":{}|<>]/.test(password) // al menos un carácter especial
        ) {
            let errorMensaje = 'La contraseña debe cumplir con al menos:';

            if (password.length < 8) {
                errorMensaje += ' 8 caracteres.';
            }

            if (!/[a-z]/.test(password)) {
                errorMensaje += ' Una letra minúscula.';
            }

            if (!/[A-Z]/.test(password)) {
                errorMensaje += ' Una letra mayúscula.';
            }

            if (!/\d/.test(password)) {
                errorMensaje += ' Un número.';
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                errorMensaje += ' Un carácter especial.';
            }


            showToastMessage(errorMensaje, 'info');

            return;
        }


        //Verificar existencia de usuario y correo antes de registrar
        try {
            const response = await fetch(UrlUsuarios);
            const usuarios = await response.json();

            if (usuarios.find(u => u.correo === correo)) {
                showToastMessage('El correo ya existe. Utiliza otro', 'warning');
                return;
            }

            // Si no existe, proceder con el registro
            const registroResponse = await fetch(UrlUsuarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    contraseña: password,
                    numeroTelefono: telefono
                }),
            });
            // Limpiar campos y establecer mensajes de éxito si es necesario
            setNombre('');
            setApellido('');
            setTelefono('');
            setCorreo('');
            setPassword('');
            // Redirigir al usuario a la página de éxito
            showToastMessage(`Registro exitoso. Se enviará un correo a ${correo} para activar tu cuenta.`, 'success');
            history('/login');
        } catch (error) {
            console.error('Error al agregar datos:', error);
            showToastMessage('Error al agregar datos!', 'error');
        }
    };


    return (
        <>
            <ToastMessage
                showToast={showToast}
                message={message}
                onClose={() => setShowToast(false)}
                toastColor={toastColor}
            />
            <div className="container">
                <div className="row justify-content-center m-3">
                    <div className="col-md-5 border">

                        <Form onSubmit={handleSubmit}>
                            <h2 className="m-2 text-center">Registro</h2>

                            <Form.Group className=" mb-3" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-id-card"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa tu nombre"
                                        aria-describedby="basic-addon1"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="apellido">
                                <Form.Label>Apellido</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-id-card"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa tu apellido"
                                        aria-describedby="basic-addon1"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)} />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="usuario">
                                <Form.Label>Telefono</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-phone"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa tu número"
                                        aria-describedby="basic-addon1"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)} />
                                </div>
                            </Form.Group>

                            <Form.Group className="" controlId="correo">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingresa tu correo electrónico"
                                        aria-describedby="basic-addon1"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)} />
                                </div>
                                <Form.Label className='mt-3'>Contraseña</Form.Label>
                            </Form.Group>

                            <Form.Group className="input-group mb-3" controlId="password">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    classname='input-group'
                                />
                                <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ?
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                        :
                                        <FontAwesomeIcon icon={faEye} />
                                    }
                                </button>
                            </Form.Group>
                            <div className="text-center m-3 d-grid mx-auto">
                                <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                    Registrarse
                                </button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default RegistroUsuario;
