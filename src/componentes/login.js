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

        if (!email || !password) {
            showToastMessage('Por favor, completa los campos.', 'error');
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
                                <input type="email" className="form-control" placeholder="Ingresa tu correo electrónico" aria-describedby="basic-addon1" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                required
                                classname='input-group'
                            />
                            <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </Form.Group>
                        <div className="text-center mt-3 d-grid mx-auto">
                            <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className='text-center m-2'>
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
