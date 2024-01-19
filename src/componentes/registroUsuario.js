import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UrlUsuarios } from '../url/urlSitioWeb';
import { useNavigate } from 'react-router-dom';

function RegistroUsuario() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones iniciales
    if (!nombre || !apellido || !usuario || !correo || !password) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    const validateNombre = (nombre) => /^[a-zA-Z]+$/.test(nombre) && nombre.length > 2;

    if (!nombre || !validateNombre(nombre)) {
        setError('El nombre debe contener más de 2 letras.');
        return;
    }

    if (!/^[a-zA-Z]+$/.test(apellido)) {
        setError('El apellido solo debe contener letras.');
        return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
        setError('El nombre de usuario solo puede contener letras, números y guiones bajos.');
        return;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
        setError('Por favor, introduce una dirección de correo electrónico válida.');
        return;
    }

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
        setError('La contraseña debe tener al menos 8 caracteres, incluir letras y números.');
        return;
    }

    // Verificar existencia de usuario y correo antes de registrar
    try {
        const response = await fetch(UrlUsuarios);
        const usuarios = await response.json();

        if (usuarios.find(u => u.username === usuario || u.correo === correo)) {
            setError('El usuario o correo ya existe.');
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
                username: usuario,
                contraseña: password,
                correo: correo,
                pregunta: 'pregunta',
                respuesta: 'respuesta'
            }),
        });
        // Limpiar campos y establecer mensajes de éxito si es necesario
        setNombre('');
        setUsuario('');
        setCorreo('');
        setApellido('');
        setPassword('');
        setError('');

        // Redirigir al usuario a la página de éxito
        alert('Datos agregados con éxito!');
        history('/login');

    } catch (error) {
        console.error('Error al agregar datos:', error);

        // Manejar errores durante la solicitud
        setError('Hubo un error al registrar');
        alert('Error al agregar datos!');
    }
};


    return (
        <div className="container">
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form onSubmit={handleSubmit}>
                        <h2 className="m-2 text-center">Registro</h2>
                        {error &&
                            <div className=''>
                                <p className="mt-1 mb-1 alert alert-danger ">{error}</p>
                            </div>
                        }
                        <Form.Group className=" mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-id-card"></i></span>
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
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-id-card"></i></span>
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
                            <Form.Label>Usuario</Form.Label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa tu usuario"
                                    aria-describedby="basic-addon1"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)} />
                            </div>
                        </Form.Group>

                        <Form.Group className="" controlId="correo">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope"></i></span>
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
                            <span class="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
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
    );
}

export default RegistroUsuario;
