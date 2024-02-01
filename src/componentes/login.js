import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { UrlLoginUsuarios } from '../url/urlSitioWeb';
import { AuthContext } from '../autenticar/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ToastMessage from '../utilidad/Toast'; // Toast 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const [showError, setShowError] = useState(false);
    const history = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

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

        setShowError(false);

        if (!email || !password) {
            setShowError(true);
            return;
        }

        // Verificar las credenciales del usuario en los datos importados     
        fetch(UrlLoginUsuarios, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo: email,
                contraseña: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data._id) {
                    if (data.estado === "ACTIVO") {
                        login(data);
                        if (data.rol === "User") {
                            history('/');
                        } else if (data.rol === "Admin") {
                            history('/inicioAdmin');
                        } else if (data.rol === "Gerente") {
                            history('/inicioGerente');
                        }
                    } else {
                        showToastMessage('Tu cuenta está inactiva. Por favor, contacta al administrador.', 'error');
                    }
                } else {
                    showToastMessage('Credenciales incorrectas. Verifica tu correo y contraseña.', 'error');
                }
            })
            .catch((err) => console.log(err));


    };

    return (
        <div className="container">
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form onSubmit={handleSubmit}>
                        <ToastMessage
                            showToast={showToast}
                            message={message}
                            onClose={() => setShowToast(false)}
                            toastColor={toastColor}
                        />
                        <h2 className="m-2 text-center">Inicio de Sesión</h2>

                        <Form.Group className="" controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                <input type="email" 
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

                        <Form.Group className="input-group mb-1" controlId="password">
                            <Form.Label className='mt-1'>Contraseña</Form.Label>
                            <div className="input-group">
                                <span class="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingresa tu contraseña"
                                    aria-describedby="basic-addon1"
                                    value={password}
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
