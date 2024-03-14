import React, { useState, useContext } from 'react';
import { decodeToken } from "react-jwt"; // Importa la función decodeToken
import { AuthContext } from '../autenticar/AuthProvider';
import Form from 'react-bootstrap/Form';
import { UrlLoginUsuarios } from '../url/urlSitioWeb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../css/colores.css';
import Swal from "sweetalert2";
import Breadcrumb from '../utilidad/migapan'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const [showError, setShowError] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setShowError(false);

        if (!email || !password) {
            setShowError(true);
            return;
        }

        try {
            //const url = 'http://localhost:3000/api/auth/login'
            const res = await fetch(UrlLoginUsuarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email,
                    contraseña: password,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                window.location.href = data.redirect;// Verificar si la respuesta indica una redirección
                const decodedToken = decodeToken(data.token); // Decodifica el token
                login(decodedToken); // Establece el usuario autenticado en el contexto                
            } else {
                const data = await res.json();
                Swal.fire({ title: `${data.message}`, icon: 'error', timer: 1500 });
            }
        } catch (error) {
            // Manejar el error de red
            console.error('Error al realizar la solicitud:', error);
            Swal.fire({ title: 'Error al realizar la solicitud', icon: 'error', timer: 1500 });
        }
    };

    return (
        <div className="container">
            <div className='flex container mx-auto justify-center'>
                <Breadcrumb path={'Iniciar sesión'} />
            </div>
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form onSubmit={handleSubmit}>
                        <h2 className="m-2 text-center">Inicio de Sesión</h2>
                        <Form.Group >
                            <Form.Label>Correo Electrónico</Form.Label>
                            <div className="input-group" >
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                <input type="email"
                                    id='cajaTexto'
                                    className={`form-control ${showError && !email ? 'is-invalid' : ''}`}
                                    placeholder="Ingresa tu correo electrónico"
                                    aria-describedby="basic-addon1" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {showError && !email && (
                                <Form.Text className="text-danger">
                                    Ingrese su correo.
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="input-group mb-1" >
                            <Form.Label className='mt-1'>Contraseña</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingresa tu contraseña"
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    id='cajaTexto'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`form-control ${showError && !password ? 'is-invalid' : ''}`}
                                />
                                <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </button>
                            </div>
                            {showError && !password && (
                                <Form.Text className="text-danger">
                                    Ingrese una contraseña.
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div>
                            <div className="text-center m-2 mb-2 d-grid mx-auto">
                                <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>

                        <div className='text-center m-2 mb-3'>
                            <Link className="link-primary " to="/recuperarPassword">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
